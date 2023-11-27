<template>
  <div>
    <p class="text-center text-white" style="margin-top:5%;">Tap an concert to view more information</p>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <q-btn-dropdown color="primary" :label="`Sort by ${sortBy}`">
        <q-list>
          <q-item clickable v-close-popup @click="sortBy = 'date'">
            <q-item-section>
              <q-item-label>Date</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="sortBy = 'name'">
            <q-item-section>
              <q-item-label>Name</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="sortBy = 'popularity'">
            <q-item-section>
              <q-item-label>Popularity</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div v-if="sortBy === 'date'" class="q-pa-md">
      <div v-for="(concert, index) in sortedConcertsByDate" :key="index">
        <concert-card :concertData="concert"/>
      </div>
    </div>
    <div v-if="sortBy === 'name'" class="q-pa-md">
      <div v-for="(concert, index) in sortedConcertsByName" :key="index">
        <concert-card :concertData="concert"/>
      </div>
    </div>
  </div>
</template>

<script>
import {concertsState} from "src/mixins/concertsState";
import {venuesState} from "src/mixins/venuesState"
import ConcertCard from "components/ConcertCard";

export default {
  name: "Concerts",
  mixins: [concertsState, venuesState],
  components: {ConcertCard},
  computed: {
    sortedConcertsByName() {
      const today = this.$moment().toDate()
      let filteredConcerts = this.concerts.filter(concert => this.$moment(concert.date).isAfter(today))
      const sortedNames = this.filteredConcerts

      let venueConcerts;
      if (this.selectedVenue !== null) {
        venueConcerts = filteredConcerts.filter(concert => concert.venueConcertsId === this.selectedVenue.id)
      } else {
        venueConcerts = filteredConcerts
      }

      venueConcerts.sort(function (a, b) {
        const sortedConcertA = a.name;
        const sortedConcertB = b.name;
        return (sortedConcertB > sortedConcertA) ? -1 : (sortedConcertB < sortedConcertA) ? 1 : 0;
      });

      return venueConcerts
    },
    sortedConcertsByDate() {
      // let sortedTimeSeries = timeSeriesArray.sort(function (a, b) {
      //   const timeSeriesA = a.name.toUpperCase();
      //   const timeSeriesB = b.name.toUpperCase();
      //   return (timeSeriesA < timeSeriesB) ? -1 : (timeSeriesA > timeSeriesB) ? 1 : 0;
      // });
      const today = this.$moment().toDate()
      let filteredConcerts = this.concerts.filter(concert => this.$moment(concert.date).isAfter(today))
      let venueConcerts;
      if (this.selectedVenue !== null) {
        venueConcerts = filteredConcerts.filter(concert => concert.venueConcertsId === this.selectedVenue.id)
      } else {
        venueConcerts = filteredConcerts
      }


      let sortedConcerts = venueConcerts


      return sortedConcerts
    }
  },
  mounted() {
    if (this.concerts.length === 0) {
      this.$store.dispatch('concerts/getConcertsData')
    }

  },
  data() {
    return {
      sortBy: 'date'
    }
  }
}
</script>

<style scoped>

</style>
