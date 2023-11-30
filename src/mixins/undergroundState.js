import {mapGetters} from 'vuex'

export const undergroundState = {

  computed: {
    ...mapGetters({
      posts: 'underground/posts',
    })
  }
}
