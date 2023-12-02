import {mapGetters} from 'vuex'

const authState = {

  computed: {
    ...mapGetters({
     user: 'auth/user',
    })
  }
}

export default authState;