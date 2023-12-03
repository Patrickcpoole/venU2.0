const Str = require('@supercharge/strings')
import spotifyApi from 'boot/axios'
import axios from 'axios'


const CLIENT_ID = process.env.VUE_APP_SPOTIFY_CLIENT_ID.replace(/['"]+/g, '')
const CLIENT_SECRET = process.env.VUE_APP_SPOTIFY_CLIENT_SECRET.replace(/['"]+/g, '')
let REDIRECT_URI = process.env.VUE_APP_SPOTIFY_REDIRECT_URI


REDIRECT_URI = REDIRECT_URI.replace(/['"]+/g, '');
export async function spotifyAuth(context) {
  console.log('redirect uri', REDIRECT_URI)
  console.log('spotify auth fired')
  const state = Str.random(16)
  console.log('state in actions', state)

  const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier)
  const codeChallenge = base64encode(hashed);

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);
  
  const scope = 'user-read-private user-read-email';
  const authUrl = new URL("https://accounts.spotify.com/authorize")

  const params =  {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: REDIRECT_URI,
    state: state
  }
  
  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export async function getAccessTokenFromCode(context, code) {
  let codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  }

  const url = 'https://accounts.spotify.com/api/token';

  const body = await fetch(url, payload);
  const response =await body.json();

  localStorage.setItem('access_token', response.access_token);
}

export function getAccessToken(context, query) {
  console.log('CLIENT_SECRET', CLIENT_SECRET)
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
        resolve(data.access_token);
      } else {
        console.log('auth error', this.responseText);
        reject(new Error('Authorization error'));  // Reject the Promise with an error
      }
    }
  });
}


export async function getSpotifyUserInfo(context) {
  const token = localStorage.getItem('access_token')
  console.log('token', token)
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
  const token = localStorage.getItem('access_token')
  console.log('artist name', artistName)
  console.log('get artist info access token', token)
  return axios.get(`https://api.spotify.com/v1/search/?q=${artistName}&type=artist`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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
        "Authorization": `Bearer ${token}`
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
