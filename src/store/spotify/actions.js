const Str = require('@supercharge/strings')
import spotifyApi from 'boot/axios'
import axios from 'axios'

export async function spotifyAuth(context) {
  console.log('spotify auth fired')
  const redirect_uri = "http://localhost:8080/venues"

  const state = Str.random(16)
  console.log('state in actions', state)
  const AUTHORIZE = "https://accounts.spotify.com/authorize"

  const CLIENT_ID = '05a6825be3094112a1a5503343be3ab9'
  const REDIRECT_URI = "http://localhost:8080/venues"
  console.log('redirect uri', REDIRECT_URI)
  let url = AUTHORIZE

  url += "?client_id=" + CLIENT_ID;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(REDIRECT_URI)
  url += "&state=" + state
  url += "&show_dialog=true";
  url += "user-read-private user-read-email"

  window.location.href = url
}

export async function getAccessToken(context, query) {
  fetchAccessToken(query)


  function fetchAccessToken(query) {
    const REDIRECT_URI = "http://localhost:8080/venues"
    const CLIENT_ID = '05a6825be3094112a1a5503343be3ab9'
    const CLIENT_SECRET = '6fe26594d13f47b7b3a9f99849a2537f'
    let body = 'grant_type=authorization_code';
    body += '&code=' + query.code;
    body += '&redirect_uri=' + encodeURI(REDIRECT_URI);
    body += '&client_id=' + CLIENT_ID;
    body += '&client_secret=' + CLIENT_SECRET
    callAuthorizationApi(body)
  }

  function callAuthorizationApi(body) {
    const URL = 'https://accounts.spotify.com/api/token'
    const CLIENT_ID = '05a6825be3094112a1a5503343be3ab9'
    const CLIENT_SECRET = '6fe26594d13f47b7b3a9f99849a2537f'
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')))
    xhr.send(body)
    xhr.onload = handleAuthorizationResponse;
  }

  function handleAuthorizationResponse() {
    if (this.status == 200) {
      const data = JSON.parse(this.responseText)
      console.log('this is data', data)
      context.commit('setAccessToken', data.access_token)
      context.dispatch('getSpotifyUserInfo')
      context.commit('setRefreshToken', data.refresh_token)

    } else {
      console.log('auth error', this.responseText)
    }
  }

}

export async function getSpotifyUserInfo(context) {
  return axios.get(`https://api.spotify.com/v1/me`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.state.spotifyAuth.access_token}`
    }
  }).then(resp => {
    console.log('spotify user response', resp)
    context.commit('setSpotifyUser', resp.data)

  }).catch(err => {
    console.log('this is the spotify user error', err)
  })
}

export async function getArtistInfo(context, artistName) {
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
      context.commit('setTopTracks', resp.data.tracks.slice(0,4))

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
