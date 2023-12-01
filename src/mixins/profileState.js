import {mapGetters} from 'vuex'

export const profileState = {

  computed: {
    ...mapGetters({
      interactions: 'profile/interactions',
      interestedEvents: 'profile/interestedEvents',
      goingEvents: 'profile/goingEvents',
      undergroundEvents: 'profile/undergroundEvents',
      allEvents: 'profile/allEvents',
    })
  }
}
