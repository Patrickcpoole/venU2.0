export function setVenues(state, payload){
  state.venues = payload
}

export function setAccessToken(state, payload) {
  state.spotifyAuth.access_token = payload


}

export function setRefreshToken(state, payload) {
  state.spotifyAuth.refresh_token = payload

}

export function setTopTracks(state, payload) {
  state.topTracks = payload
}

export function setArtistSpotifyInfo(state, payload) {
  state.artistSpotifyInfo = payload
}

export function setSpotifyUser(state, payload) {
  state.spotifyUserInfo = payload
}
