import {mapGetters} from 'vuex'

export const concertsState = {

  computed: {
    ...mapGetters({
      concerts: 'concerts/concerts',
    })
  }
}
