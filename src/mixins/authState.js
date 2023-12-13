import {mapGetters} from 'vuex'

const authState = {

  computed: {
    ...mapGetters({
      user: 'auth/user',
      loginModal: 'auth/loginModal',
    })
  }
}

export default authState;
