import {mapGetters} from 'vuex'
export const spotifyState = {

  computed: {
    ...mapGetters({
      refreshToken: 'spotify/getRefreshToken',
      accessToken: 'spotify/getAccessToken',
      topTracks: 'spotify/getTopTracks',
      artistSpotifyInfo: 'spotify/getArtistSpotifyInfo',
      spotifyUserInfo: 'spotify/getArtistSpotifyInfo'
    })
  }
}
