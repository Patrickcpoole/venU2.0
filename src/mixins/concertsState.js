import {mapGetters} from 'vuex'

const concertsState = {

  computed: {
    ...mapGetters({
      concerts: 'concerts/concerts',
    })
  }
}

export default concertsState;