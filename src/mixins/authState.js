import {mapGetters} from 'vuex'

export const authState = {

  computed: {
    ...mapGetters({
     user: 'auth/user',
    })
  }
}
