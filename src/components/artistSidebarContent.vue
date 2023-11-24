<template>
  <div v-if="rightMenuVisible">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 100vh; width: 100%;"
    >
      <div class="sidebar-container">
        <q-img :src="rightMenuArtist.image" style=" height: 30vh;">
        </q-img>
        <div class="info-container">
          <span style="font-size:1.75em; font-weight: bold">{{ rightMenuArtist.name }}</span>
          <span
            style="font-size:1em;">Openers: {{
              rightMenuArtist.openers === '' ? 'No Openers listed' : rightMenuArtist.openers
            }}</span>
          <span style="margin-top:10%; font-size:1.5em;">Upcoming Show Info</span>
          <span class="info-label" style="margin-top:2.5%;">Venue</span>
          <span>Mission Ballroom</span>
          <span class="info-label">Date</span>
          <span>{{ rightMenuArtist.date }}</span>
          <span class="info-label">Doors | Show</span>
          <span>7:00PM | 8:00PM</span>
          <span class="info-label">Age</span>
          <span>16 and Over</span>
        </div>


        <!--          <q-separator dark></q-separator>-->
        <div class="button-container">
          <q-card v-if="!interested" class="icon-container" @click="handleInterested(rightMenuArtist)">
            <q-icon size="1.5em" color="purple" name="library_add_check"/>
            <span class="icon-text">Interested</span>
          </q-card>
          <q-card v-if="interested" class="icon-container" style="background: purple;"
                  @click="handleInterested(rightMenuArtist)">
            <q-icon size="1.5em" color="white" name="library_add_check"/>
            <span class="icon-text">Interested</span>
          </q-card>
          <q-card v-if="!going" class="icon-container" @click="handleGoing(rightMenuArtist)">
            <q-icon size="1.5em" color="blue" name="library_add"/>
            <span class="icon-text">I'm Going</span>
          </q-card>
          <q-card v-if="going" class="icon-container" @click="handleGoing(rightMenuArtist)" style="background: #2096f3;">
            <q-icon size="1.5em" color="white" name="library_add"/>
            <span class="icon-text" @click="handleGoing(rightMenuArtist)">I'm going</span>
          </q-card>
          <q-card class="icon-container">
            <q-icon size="1.5em" color="green" name="book_online"/>
            <span class="icon-text">Buy Tickets</span>
          </q-card>
        </div>

        <h3 style="color:#fff; font-size: 1.5em; text-align: center">Popular Songs</h3>
        <q-list dark bordered separator v-for="(topTrack, index) in topTracks" :key=index>
          <q-item clickable v-ripple class="song-playback"
                  style=" display: flex; flex-direction: column; justify-content: center; align-items: center">
            <q-item-section style="text-align: center; font-size:1.25em;">{{ topTrack.name }}</q-item-section>
            <q-item-section style="width: 100%;">
              <q-media-player
                type="audio"
                background-color="black"
                radius="1rem"
                :autoplay="false"
                :show-big-play-button="true"
                :sources="formatAudio(topTrack.preview_url)"
                track-language="English"

              >
                <!--                <template v-if="overlay" v-slot:overlay>-->
                <!--                  <div>-->
                <!--                    <img-->
                <!--                      src="quasar-logo.png"-->
                <!--                      style="width: 30vw; max-width: 50px; opacity: 0.25;"-->
                <!--                    >-->
                <!--                  </div>-->
                <!--                </template>-->
              </q-media-player>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>

import {spotifyState} from "src/mixins/spotifyState";
import {menuState} from "src/mixins/menuState"
import {profileState} from "src/mixins/profileState"

export default {
  name: "artistSidebarContent.vue",
  mixins: [spotifyState, menuState, profileState],
  mounted() {
    this.checkIfInterested()
    this.checkIfGoing()
    console.log('this is user', this.user)
  },
  methods: {
    handleInterested(data) {

      console.log('interested fired', data)
      if (!this.interested) {
        this.interested = true
        this.$store.dispatch('profile/saveInterestedArtist', data)
        this.going = false
        this.$store.dispatch('profile/removeGoingArtist', data)
        this.$q.notify({
          message: `${data.name} added to calendar as interested`,
          color: 'purple',
          actions: [
            {
              label: 'View Calendar', color: 'yellow', handler: () => {
                this.$router.push('/profile')
              },
            },
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
      } else {
        this.$store.dispatch('profile/removeInterestedArtist', data)
        this.$q.notify({
          message: `${data.name} removed from calendar as interested`,
          color: 'grey',
          actions: [
            {
              label: 'View Calendar', color: 'yellow', handler: () => {
                this.$router.push('/profile')
              },
            },
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
        this.interested = false
      }


    },
    handleGoing(data) {
      console.log('going fired', data)
      if (!this.going) {
        this.going = true
        this.$store.dispatch('profile/saveGoingArtist', data)
        this.interested = false
        this.$store.dispatch('profile/removeInterestedArtist', data)
        this.$q.notify({
          message: `${data.name} added to calendar as going`,
          color: 'blue',
          actions: [
            {
              label: 'View Calendar', color: 'yellow', handler: () => {
                this.$router.push('/profile')
              }
            },
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })

      } else {
        this.going = false
        this.$store.dispatch('profile/removeGoingArtist', data)
        this.$q.notify({
          message: `${data.name} removed from calendar as going`,
          color: 'grey',
          actions: [
            {
              label: 'Dismiss', color: 'white', handler: () => { /* ... */
              }
            }
          ]
        })
      }

    },
    formatAudio(link) {

      const type = 'audio/m4a'
      const sourceArray = [
        {
          src: link,
          type: type
        }
      ]

      return sourceArray
    },
    checkIfInterested() {
      console.log('check if interested fired', this.events.interested)


      this.events.interested.forEach(event => {
        console.log('this.rightMenuArtist.id', this.rightMenuArtist.id)
        console.log('event.id', event.id)
        if (event.id === this.rightMenuArtist.id) {
          console.log('returning true')
          this.interested = true
        } else {
          console.log('returning false')
          this.interested = false
        }
      })

    },
    checkIfGoing() {
      console.log('check if going fired', this.events.going)


      this.events.going.forEach(event => {
        console.log('this.rightMenuArtist.id', this.rightMenuArtist.id)
        console.log('event.id', event.id)
        if (event.id === this.rightMenuArtist.id) {
          console.log('returning true')
          this.going = true
        } else {
          console.log('returning false')
          this.going = false
        }
      })

    }
  },

  computed: {},
  data() {
    return {
      interested: false,
      going: false,
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#1D1D1D',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#1D1D1D',
        width: '9px',
        opacity: 0.2
      }
    }
  }
}
</script>

<style scoped lang="scss">

.info-label {
  color: $primary;
  font-size: 1.25em;
  font-weight: bold;
}

.sidebar-container {
  background-color: #222326;
  height: 100%;
  width: 100%;

}

.artist-card {
  width: 100%;
  height: 20%;
  display: flex;
  background-color: #1D1D1D;
  color: #fff;

}

.info-container {
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 33%;
  color: #fff;
  text-align: center;
}


.right-info {
  padding-top: 2.5%;
  height: 100%;
  padding-right: 5%;
}

.button-container {
  background-color: #222;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  border-bottom-right-radius: 5px;
  margin-top: 10px;
}

.icon-container {
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 5%;
  cursor: pointer;
}

.icon-text {
  margin-top: 5px;
  font-size: .8em;
  color: #fff;
}

.song-playback {
  display: flex;
  flex-direction: column;
}


</style>
