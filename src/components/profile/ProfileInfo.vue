<template>
  <div class="profile-container">

    <div class="q-pa-md flex column justify-center items-center">
      <q-avatar size="150px" class="q-my-md">
        <q-icon name="account_circle" size="2em" v-show="spotifyUserInfo.images.length === 0"/>
        <q-img v-show="spotifyUserInfo.images.length > 0" :src="spotifyUserInfo.images[1].url" height="150px"
               width="150px"/>

      </q-avatar>
      <span class="text-white text-h5">{{ spotifyUserInfo.display_name }}</span>
      <span class="text-white text-h6">{{ user.attributes.email }}</span>
      <a :href="spotifyUserInfo.external_urls.spotify" target="_blank">
        <q-btn color="primary" size="md" class="q-mt-md">
          <q-img
            class="q-my-md"
            src="https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/icons/icons8-spotify-96-transparent.png"
            height="30px" width="30px"/>
          <span class="text-white q-px-sm" style="font-size: 1.25em">View Spotify</span>
        </q-btn>
      </a>
    </div>
  </div>
</template>

<script>


import {profileState} from "src/mixins/profileState"
import {menuState} from "src/mixins/menuState"
import {spotifyState} from "src/mixins/spotifyState"
import {authState} from "src/mixins/authState"


export default {
  name: "ProfileInfo",
  components: {},
  mixins: [profileState, menuState, spotifyState, authState],

  data() {
    return {
      date: this.$moment().format('YYYY/MM/DD'),
      eventsOnChosenDate: []
    }
  },
  mounted() {
    // this.$store.dispatch('spotify/getArtistSongs')
    // console.log('is profile page firing?')
    if (this.rightMenuArtist !== null) {
      this.date = this.$moment(this.rightMenuArtist.date).format('YYYY/MM/DD')
    }
    console.log('params', this.$route.params)
  },
  methods: {
    handleChooseDate(value, reason, details) {
      console.log(value, reason, details)
      this.interestedEvents.forEach(interestedEvent => {
        console.log('interested event', this.$moment(interestedEvent['date']).format('YYYY/MM/DD'));
        console.log('value', value);
        if (this.$moment(interestedEvent['date']).format('YYYY/MM/DD') == value) {
          console.log('are these the same')
          this.eventsOnChosenDate.push(interestedEvent)
        }
      })

      this.goingEvents.forEach(goingEvent => {
        if (this.$moment(goingEvent['date']).format('YYYY/MM/DD') == value) {
          this.eventsOnChosenDate.push(goingEvent)
        }
      })
    },
    eventColors(date) {
      console.log('event colors fired', date)
      let color = ''
      if (this.goingEventDates.includes(date)) {
        console.log('its blue!')
        color = 'blue'
      } else if (this.interestedEventDates.includes(date)) {
        console.log('its purple!')
        color = 'purple'
      }

      return color
    },
  },
  computed: {
    calendarDate: {
      get() {
        if (this.rightMenuArtist) {
          return this.$moment(this.rightMenuArtist.date).format('YYYY/MM/DD')
        } else {
          return '2022/08/01'
        }
      },
      set(val) {
        this.date = val
      }

    },
    eventDates() {
      let interestedEventDates = []
      let goingEventDates = []
      this.interestedEvents.forEach(event => {
        interestedEventDates.push(this.$moment(event.date).format('YYYY/MM/DD'))
      })

      this.goingEvents.forEach(event => {
        goingEventDates.push(this.$moment(event.date).format('YYYY/MM/DD'))
      })

      return [...interestedEventDates, ...goingEventDates]
    },
    interestedEventDates() {
      let dates = []
      this.events.interested.forEach(event => {
        dates.push(this.$moment(event.date).format('YYYY/MM/DD'))
      })
      return dates
    },

    goingEventDates() {
      let dates = []
      this.events.going.forEach(event => {
        dates.push(this.$moment(event.date).format('YYYY/MM/DD'))
      })
      return dates
    },
    interestedEvents() {
      const interestedEvents = []
      if (this.events.interested.length > 0) {


        this.events.interested.forEach(event => {
          interestedEvents.push(event)
        })

      } else {
      }
      return interestedEvents
    },
    goingEvents() {
      const goingEvents = []
      if (this.events.going.length > 0) {


        this.events.going.forEach(event => {
          console.log('going event on component')
          goingEvents.push(event)
        })

      } else {
      }
      return goingEvents
    }


  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
