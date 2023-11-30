<template>
  <div>
    <p class="text-center text-white" style="margin-top:5%;">Tap a venue to view upcoming shows</p>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <q-btn-dropdown color="primary" :label="`Sort by ${sortBy}`">
        <q-list>
          <q-item clickable v-close-popup @click="sortVenues('popularity')">
            <q-item-section>
              <q-item-label>Popularity</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="sortVenues('capacity')">
            <q-item-section>
              <q-item-label>Capacity</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="sortVenues('alphabetically')">
            <q-item-section>
              <q-item-label>Alphabetically</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div v-if="sortBy === 'popularity'">
      <div v-for="(venue, index) in venues" :key="index">
        <venue-card :venueData="venue"/>
      </div>
    </div>
    <div v-if="sortBy === 'alphabetically'">
      <div v-for="(venue, index) in alphabeticVenues" :key="index">
        <venue-card :venueData="venue"/>
      </div>
    </div>
    <div v-if="sortBy === 'capacity'">
      <div v-for="(venue, index) in capacityVenues" :key="index">
        <venue-card :venueData="venue"/>
      </div>
    </div>
  </div>
</template>

<script>


import VenueCard from "components/VenueCard";
import {venuesState} from "../mixins/venuesState"
import {spotifyState} from "../mixins/spotifyState"

export default {
  name: "Venues",
  components: {VenueCard},
  mixins: [spotifyState, venuesState],
  methods: {
    createVenue() {
      this.error = ''
      const newVenue = {
        name: 'Cervantes Masterpiece Ballroom',
        capacity: '900',
        location: 'Englewood',
        image: 'https://venuephotos1.s3.amazonaws.com/cervantes.jpg'
      }
      this.$store.dispatch("venues/createVenue", newVenue)
    },
    sortVenues(sortType) {
      this.sortBy = sortType
      if (sortType === 'popularity') {

      } else if (sortType === 'capacity') {

      } else {

      }
    }

  },
  async mounted() {
  try {
     await this.$store.dispatch('venues/getVenuesData');
     await this.$store.dispatch('underground/listPosts');
      // await this.$store.dispatch('venues/saveSelectedVenue', null);

    console.log('route query', this.$route.query);

    if (this.accessToken === null) {
      await this.$store.dispatch('spotify/getAccessToken', this.$route.query);


      console.log('Venues Data Loaded');

      await this.$store.dispatch('spotify/getSpotifyUserInfo', this.accessToken);
      console.log('Spotify User Info Loaded');
    }
  } catch (error) {
    console.error('Error:', error);
  }
},


  data() {
    return {
      sortBy: 'popularity',
      error: '',
      name: '',
      location: '',
      capacity: ''
    }
  }
}
</script>

<style scoped>

</style>
