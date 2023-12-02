import {mapGetters} from 'vuex'

const profileState = {

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

export default profileState;
