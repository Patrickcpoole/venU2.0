import {mapGetters} from 'vuex'

export const profileState = {

  computed: {
    ...mapGetters({
      events: 'profile/events',
    })
  }
}
