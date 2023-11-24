export function venues(state) {
  return state.venues
}

export function getRefreshToken(state) {
  return state.spotifyAuth.refresh_token
}

export function getAccessToken(state) {
  return state.spotifyAuth.access_token
}

export function getTopTracks(state) {
  return state.topTracks
}

export function getArtistSpotifyInfo(state) {
  return state.artistSpotifyInfo
}

export function getSpotifyUserInfo(state) {
  return state.spotifyUserInfo
}
