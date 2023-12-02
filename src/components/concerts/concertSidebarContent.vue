<template>
  <div v-if="rightMenuVisible" style="background-color: #222326; height: 100% ">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="width: 100%; height: 100%"
    >
      <div class="sidebar-container">
        <q-img :src="rightMenuConcert.image" style=" height: 25vh;">
        </q-img>
        <div class="info-container">
          <span style="font-size:1.75em; font-weight: bold">{{ rightMenuConcert.name }}</span>

          <span style="margin-top:25px; font-size:1.5em;">Upcoming Show Info</span>
          <span class="info-label" style="margin-top:2.5%;">Venue</span>
          <span>{{ selectedConcertVenue.name }}</span>
          <span class="info-label">Date</span>
          <span>{{ rightMenuConcert.date }}</span>
          <div v-if="rightMenuConcert.openers !==''" class="flex column justify-center items-center">
            <span class="info-label">Openers</span>
            <span>{{ rightMenuConcert.openers }}</span>
          </div>
          <span class="info-label" v-if="rightMenuConcert.startTime.includes('|')">Doors | Show</span>
          <span class="info-label" v-if="!rightMenuConcert.startTime.includes('|')">Show Time</span>
          <span>{{ rightMenuConcert.startTime }}</span>

        </div>


        <!--          <q-separator dark></q-separator>-->
        <div class="button-container">
          <q-card v-if="!interested" class="icon-container" @click="handleInteraction(rightMenuConcert, 'INTERESTED')">
            <q-icon size="1.25em" color="purple" name="library_add_check"/>
            <span class="icon-text">Interested</span>
          </q-card>
          <q-card v-if="interested" class="icon-container" style="background: purple;"
                  @click="handleInteraction(rightMenuConcert, 'INTERESTED')">
            <q-icon size="1.25em" color="white" name="library_add_check"/>
            <span class="icon-text">Interested</span>
          </q-card>
          <q-card v-if="!going" class="icon-container" @click="handleInteraction(rightMenuConcert, 'GOING')">
            <q-icon size="1.25em" color="blue" name="library_add"/>
            <span class="icon-text">I'm Going</span>
          </q-card>
          <q-card v-if="going" class="icon-container" @click="handleInteraction(rightMenuConcert, 'GOING')"
                  style="background: #2096f3;">
            <q-icon size="1.25em" color="white" name="library_add"/>
            <span class="icon-text" @click="handleInteraction(rightMenuConcert, 'GOING')">I'm going</span>
          </q-card>
          <q-card class="icon-container">
            <q-icon size="1.25em" color="green" name="book_online"/>
            <span class="icon-text">Buy Tickets</span>
          </q-card>
        </div>

        <h3
          style="color:#fff; font-size: 1.5em; text-align: center; margin-top: 25px;
           margin-bottom: 10px; padding-left:7.5%; padding-right: 7.5%; line-height: 1.25em">
          Discover {{ rightMenuConcert.artistName }}</h3>
        <q-list dark bordered style="width: 100%">
          <q-expansion-item
            dark
            v-if="rightMenuConcert.youtube !== null"
            expand-separator

            label="Youtube"
            caption=""
            default-opened
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/icons/icons8-youtube-48.png"
                       alt="Youtube icon">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white text-subtitle2">Youtube</q-item-label>
                <q-item-label class="text-white" style="font-size: 0.8em">View live performances</q-item-label>
              </q-item-section>
            </template>

            <q-video
              dark
              :src="rightMenuConcert.youtube"
              :ratio="16/9"
            />
          </q-expansion-item>
          <q-expansion-item
            dark
            expand-separator
            label="Spotify"
            caption="Sample top songs"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/icons/icons8-spotify-96.png"
                       alt="Spotify icon">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-white text-subtitle2">Spotify</q-item-label>
                <q-item-label class="text-white" style="font-size: 0.8em">Sample top songs</q-item-label>
              </q-item-section>
            </template>
            <!-- <q-list dark bordered separator v-for="(topTrack, index) in topTracks" :key=index>
              <q-item dark class="song-playback"
                      style=" display: flex; flex-direction: column; justify-content: center; align-items: center">


                <q-item-section dark style="width: 100%; padding-bottom: 15px;">
                  <span style="text-align: center; font-size:1.25em; margin-bottom: -15px;">{{ topTrack.name }}</span>
                  <q-media-player
                    dark
                    type="audio"
                    :muted="true"
                    background-color="#333"
                    :native-controls="true"
                    :no-controls="true"
                    radius="1rem"
                    :autoplay="false"
                    :show-big-play-button="true"
                    :sources="formatAudio(topTrack.preview_url)"
                    track-language="English"/>
                </q-item-section>
              </q-item>
            </q-list> -->

          </q-expansion-item>
        </q-list>

      </div>
    </q-scroll-area>
  </div>
</template>

<script>

import {spotifyState} from "src/mixins/spotifyState";
import {menuState} from "src/mixins/menuState"
import {profileState} from "src/mixins/profileState"
import {venuesState} from "src/mixins/venuesState";

export default {
  name: "concertSidebarContent.vue",
  mixins: [spotifyState, menuState, profileState, venuesState],

  mounted() {
    // if (this.rightMenuConcert) {
    //   this.checkInteractions();
    // }
  },

  methods: {

    async checkInteractions() {
      const goingInteraction = this.interactions.find(interaction => interaction.concertId === this.rightMenuConcert.id && interaction.status === 'GOING');
      const interestedInteraction = this.interactions.find(interaction => interaction.concertId === this.rightMenuConcert.id && interaction.status === 'INTERESTED');

      this.going = !!goingInteraction; // Set to true if there's a 'GOING' interaction
      this.interested = !!interestedInteraction; // Set to true if there's an 'INTERESTED' interaction
    },
    // checkInteractionType(allInteractions, type, concertId, stateType) {
    //   const isInteracted = allInteractions[type].some(interaction => interaction.id === concertId);
    //   this[stateType] = isInteracted;
    // },
    async handleInteraction(data, status) {
      const isInterested = status === "INTERESTED";
      const currentState = isInterested ? this.interested : this.going;

      if (!currentState) {
        await this.$store.dispatch('profile/saveConcertInteraction', {data, status});
        this.interested = isInterested;
        this.going = !isInterested;
        this.notifyMessage(data, isInterested);
      } else {
        await this.$store.dispatch('profile/removeConcertInteraction', {data, status});
        this.notifyMessage(data, isInterested, true);
        this.interested = false;
        this.going = false;
      }
    },
    notifyMessage(data, isInterested, removal = false) {
      console.log('data in notify message', data)
      const eventName = data.artistName;
      const action = removal ? "removed" : "added";
      const color = isInterested ? "purple" : "blue";

      this.$q.notify({
        message: `${eventName} ${action} to calendar as ${isInterested ? "INTERESTED" : "GOING"}`,
        color,
        actions: [
          {
            label: 'View Calendar',
            color: 'yellow',
            handler: () => this.$router.push({ path: '/profile', query: { date: this.rightMenuConcert.date } })
          },
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => { /* ... */
            }
          }
        ]
      });
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
    }
  },

  computed: {
    selectedConcertVenue() {
      return this.venues.find(venue => venue.id === this.rightMenuConcert.venueConcertsId)
    },
    going: function () {
      return !!this.interactions.find(interaction => interaction.concertId === this.rightMenuConcert.id && interaction.status === 'GOING');
    },
    interested: function () {
      return !!this.interactions.find(interaction => interaction.concertId === this.rightMenuConcert.id && interaction.status === 'INTERESTED');
    },
  },
  data() {
    return {
      // interested: false,
      // going: false,
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
<style scoped lang="sass">

.info-label 
  color: $primary
  font-size: 1.25em
  font-weight: bold


.sidebar-container 
  background-color: #222326
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  flex-grow: 1


.concert-card 
  width: 100%
  height: 20%
  display: flex
  background-color: #1D1D1D
  color: #fff



.info-container 
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  color: #fff
  text-align: center



.right-info 
  padding-top: 2.5%
  height: 100%
  padding-right: 5%


.button-container 
  background-color: #222
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center
  flex-wrap: wrap
  border-bottom-right-radius: 5px
  margin-top: 25px


.icon-container 
  width: 30%
  height: 50px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background-color: #333
  padding: 5%
  cursor: pointer


.icon-text 
  margin-top: 5px
  font-size: .8em
  color: #fff


.song-playback 
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center



</style>
