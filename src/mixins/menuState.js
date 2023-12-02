import {mapGetters} from 'vuex'

const menuState = {
  // mounted() {
  //   if (!this.isLoggedIn) {
  //     this.$router.push('/login/')
  //   }
  // },
  computed: {
    ...mapGetters({
      leftMenuVisible: 'menu/leftMenuVisible',
      rightMenuVisible: 'menu/rightMenuVisible',
      rightMenuConcert: 'menu/rightMenuConcert'
    })
  }
}

export default menuState;