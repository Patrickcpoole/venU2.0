import {mapGetters} from 'vuex'

export const menuState = {
  // mounted() {
  //   if (!this.isLoggedIn) {
  //     this.$router.push('/login/')
  //   }
  // },
  computed: {
    ...mapGetters({
      rightMenuVisible: 'menu/rightMenuVisible',
      rightMenuArtist: 'menu/rightMenuArtist'
    })
  }
}
