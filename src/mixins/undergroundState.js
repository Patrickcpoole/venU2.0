import {mapGetters} from 'vuex'

const undergroundState = {

  computed: {
    ...mapGetters({
      posts: 'underground/posts',
    })
  }
}

export default undergroundState;