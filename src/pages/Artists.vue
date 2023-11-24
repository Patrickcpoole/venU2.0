<template>
  <div>
    <p class="text-center text-white" style="margin-top:5%;">Tap an artist to view more information</p>
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
      <div v-for="(artist, index) in sortedArtistsByDate" :key="index">
        <artist-card :artistData="artist"/>
      </div>
    </div>
    <div v-if="sortBy === 'name'" class="q-pa-md">
      <div v-for="(artist, index) in sortedArtistsByName" :key="index">
        <artist-card :artistData="artist"/>
      </div>
    </div>
  </div>
</template>

<script>
import {artistsState} from "src/mixins/artistsState";
import {venuesState} from "src/mixins/venuesState"
import ArtistCard from "components/ArtistCard";

export default {
  name: "Artists",
  mixins: [artistsState, venuesState],
  components: {ArtistCard},
  computed: {
    sortedArtistsByName() {
      const today = this.$moment().toDate()
      let filteredArtists = this.artists.filter(artist => this.$moment(artist.date).isAfter(today))
      const sortedNames = this.filteredArtists

      let venueArtists;
      if (this.selectedVenue !== null) {
        venueArtists = filteredArtists.filter(artist => artist.venueArtistsId === this.selectedVenue.id)
      } else {
        venueArtists = filteredArtists
      }

      venueArtists.sort(function (a, b) {
        const sortedArtistA = a.name;
        const sortedArtistB = b.name;
        return (sortedArtistB > sortedArtistA) ? -1 : (sortedArtistB < sortedArtistA) ? 1 : 0;
      });

      return venueArtists
    },
    sortedArtistsByDate() {
      // let sortedTimeSeries = timeSeriesArray.sort(function (a, b) {
      //   const timeSeriesA = a.name.toUpperCase();
      //   const timeSeriesB = b.name.toUpperCase();
      //   return (timeSeriesA < timeSeriesB) ? -1 : (timeSeriesA > timeSeriesB) ? 1 : 0;
      // });
      const today = this.$moment().toDate()
      let filteredArtists = this.artists.filter(artist => this.$moment(artist.date).isAfter(today))
      let venueArtists;
      if (this.selectedVenue !== null) {
        venueArtists = filteredArtists.filter(artist => artist.venueArtistsId === this.selectedVenue.id)
      } else {
        venueArtists = filteredArtists
      }


      let sortedArtists = venueArtists


      return sortedArtists
    }
  },
  mounted() {
    if (this.artists.length === 0) {
      this.$store.dispatch('artists/getArtistsData')
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
