const Str = require('@supercharge/strings')
import spotifyApi from 'boot/axios'
import axios from 'axios'


const CLIENT_ID = process.env.VUE_APP_SPOTIFY_CLIENT_ID.replace(/['"]+/g, '')
const CLIENT_SECRET = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET.replace(/['"]+/g, '')
let REDIRECT_URI = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SPOTIFY_REDIRECT_URI : 'http://localhost:8080/venues'

console.log('redirect uri', REDIRECT_URI)
REDIRECT_URI = REDIRECT_URI.replace(/['"]+/g, '');
export async function spotifyAuth(context) {
  console.log('spotify auth fired')
  const state = Str.random(16)
  console.log('state in actions', state)
  const AUTHORIZE = "https://accounts.spotify.com/authorize"



  console.log('redirect uri', REDIRECT_URI)
  let url = AUTHORIZE
  console.log('client id', CLIENT_ID)
  url += "?client_id=" + CLIENT_ID;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(REDIRECT_URI)
  url += "&state=" + state
  url += "&show_dialog=true";
  url += "user-read-private user-read-email"

  window.location.href = url
}

export function getAccessToken(context, query) {
  return new Promise((resolve, reject) => {
    fetchAccessToken(query);

    function fetchAccessToken(query) {
      console.log('client id', CLIENT_ID);
      let body = 'grant_type=authorization_code';
      body += '&code=' + query.code;
      body += '&redirect_uri=' + encodeURI(REDIRECT_URI);
      body += '&client_id=' + CLIENT_ID;
      body += '&client_secret=' + CLIENT_SECRET;
      callAuthorizationApi(body);
    }

    function callAuthorizationApi(body) {
      const URL = 'https://accounts.spotify.com/api/token';
      let xhr = new XMLHttpRequest();
      xhr.open('POST', URL, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Authorization', 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')));
      xhr.send(body);
      xhr.onload = handleAuthorizationResponse;
    }

    function handleAuthorizationResponse() {
      if (this.status == 200) {
        const data = JSON.parse(this.responseText);
        console.log('this is data in spotify actions', data);
        context.commit('setAccessToken', data.access_token);
        context.commit('setRefreshToken', data.refresh_token);
        resolve(data);  // Resolve the Promise with the entire data object
      } else {
        console.log('auth error', this.responseText);
        reject(new Error('Authorization error'));  // Reject the Promise with an error
      }
    }
  });
}


export async function getSpotifyUserInfo(context, token) {
  return axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then(resp => {
    console.log('spotify user response', resp)
    context.commit('setSpotifyUser', resp.data)

  }).catch(err => {
    console.log('this is the spotify user error', err)
  })
}

export async function getArtistInfo(context, artistName) {
  console.log('artist name', artistName)
  console.log('get artist info access token', context.state.spotifyAuth.access_token)
  return axios.get(`https://api.spotify.com/v1/search/?q=${artistName}&type=artist`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.state.spotifyAuth.access_token}`
    }
  }).then(resp => {
    console.log('artist info resp', resp)
    const filteredArtists = resp.data.artists.items

    context.commit('setArtistSpotifyInfo', filteredArtists[0])

    const artistId = filteredArtists[0].id

    return axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.state.spotifyAuth.access_token}`
      }
    }).then(resp => {
      console.log('artist top tracks resp', resp)
      context.commit('setTopTracks', resp.data.tracks.slice(0,3))

    }).catch(err => {
      console.log('top tracks error', err)
    })

  }).catch(err => {
    console.log('artist search error', err)
  })
}


export async function getArtistSongs(context) {

  // const scopes = [
  //   'streaming',
  // ].join(',')
  //
  // const params = {
  //   scope: scopes
  // }
  //
  // const queryParamString = new URLSearchParams(params).toString()
  //
  // const LOGIN_URL = `https://accounts.spotify/authorize?${queryParamString}`


  spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
    .then(function (data) {
      console.log('Album information', data.body);
    }, function (err) {
      console.error('spotify error', err);
    });

}
