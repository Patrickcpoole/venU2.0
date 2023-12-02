import {mapGetters} from 'vuex'

const spotifyState = {

  computed: {
    ...mapGetters({
      refreshToken: 'spotify/getRefreshToken',
      accessToken: 'spotify/getAccessToken',
      topTracks: 'spotify/getTopTracks',
      artistSpotifyInfo: 'spotify/getArtistSpotifyInfo',
      spotifyUserInfo: 'spotify/getSpotifyUserInfo'
    })
  }
}

export default spotifyState;
