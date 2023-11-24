import {mapGetters} from 'vuex'

export const artistsState = {

  computed: {
    ...mapGetters({
      artists: 'artists/artists',
    })
  }
}
