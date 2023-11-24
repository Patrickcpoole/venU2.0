<template>
  <div class="profile-container">
    <h3 style="color:#fff; border-bottom: solid 1px #fff; width: 100%; text-align: center; padding-bottom: 10px">My
      Shows</h3>
    <div class="q-pa-md">
      <div >
        <q-date
          @input="(date) => handleChooseDate(date)"
          v-model="date"
          :events="eventDates"
          :event-color="(date) => eventColors(date)"
          dark
          landscape
        />
        <div v-for="(artist, index) in eventsOnChosenDate" :key="index">
        <artist-card :artistData="artist"/>
      </div>
      </div>

    </div>
  </div>
</template>

<script>


import {profileState} from "src/mixins/profileState"
import {menuState} from "src/mixins/menuState"
import ArtistCard from "src/components/ArtistCard"

export default {
  name: "MyShows",
  components: {ArtistCard},
  mixins: [profileState, menuState],

  data() {
    return {
      date: this.$moment().format('YYYY/MM/DD'),
      eventsOnChosenDate: []
    }
  },
  mounted() {
    // this.$store.dispatch('spotify/getArtistSongs')
    // console.log('is profile page firing?')
    if(this.rightMenuArtist !== null) {
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
