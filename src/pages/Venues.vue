<template>
  <div>
    <p class="text-center text-white" style="margin-top:5%;">Tap a venue to view upcoming shows</p>
<!--    <q-form-->
<!--      @submit="createVenue"-->
<!--      class="q-gutter-md"-->
<!--    >-->
<!--      <q-input-->
<!--        filled-->
<!--        v-model="name"-->
<!--        label="Name"-->
<!--        lazy-rules-->
<!--        :rules="[ val => val && val.length > 0 || 'Please type something']"-->
<!--      />-->

<!--      <q-input-->
<!--        filled-->
<!--        v-model="capacity"-->
<!--        label="Capacity"-->
<!--        lazy-rules-->

<!--      />-->
<!--      <q-input-->
<!--        filled-->
<!--        v-model="location"-->
<!--        label="Location"-->
<!--        lazy-rules-->

<!--      />-->

<!--      <div>-->
<!--        <q-btn label="Submit" type="submit" color="primary"/>-->
<!--      </div>-->
<!--      <p class="text-danger">{{error}}</p>-->
<!--    </q-form>-->
<!--    <q-btn label="Create Venue" @click="createVenue" color="primary"/>-->
    <div v-for="(venue, index) in venues" :key="index">
        <venue-card :venueData="venue"/>
      </div>
  </div>
</template>

<script>


import VenueCard from "components/VenueCard";
import {mapGetters} from "vuex"

export default {
  name: "Venues",
  components: {VenueCard},
  methods: {
    createVenue(){
      this.error = ''
      const newVenue = {
        name: 'Cervantes Masterpiece Ballroom',
        capacity: '900',
        location: 'Englewood',
        image: 'https://venuephotos1.s3.amazonaws.com/cervantes.jpg'
      }
     this.$store.dispatch("venues/createVenue", newVenue)
    }
  },
  computed: {
      ...mapGetters({
        user: "auth/user",
        venues: "venues/venues"
      })
  },
  mounted() {
    this.$store.dispatch('venues/getVenuesData')
  },
  data() {
    return {
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
