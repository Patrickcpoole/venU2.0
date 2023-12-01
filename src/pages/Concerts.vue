<template>
  <div class="flex column justify-start items-center">
    <p class="text-center text-white q-mt-lg text-subtitle1">
      {{ $q.platform.is.mobile ? 'Tap' : 'Click' }} a concert to view details
    </p>
    <button-dropdown @sort="sortConcerts" :dropdown-buttons="dropdownButtons"/>
    <div class="concert-grid">
      <div v-for="concert in sortedConcerts" :key="concert.id">
        <concert-card :concertData="concert"/>
      </div>
    </div>
  </div>
</template>

<script>
import {concertsState} from "src/mixins/concertsState";
import {venuesState} from "src/mixins/venuesState"
import ConcertCard from "components/concerts/ConcertCard";
import {checkIfAfterToday} from "src/utils/dateUtils";
import ButtonDropdown from "components/menu/ButtonDropdown.vue";

export default {
  name: "Concerts",
  mixins: [concertsState, venuesState],
  components: {ButtonDropdown, ConcertCard},
  methods: {
    extractFirstDate(dateString) {

      if (dateString.includes('&')) {

        const firstDate = dateString.split('&')[0].trim();
        const dateArray = dateString.split(' ');
        const year = dateArray[4]

        return new Date(`${firstDate}, ${year}`);
      } else {
        // If "&" is not present, parse the entire date string
        return new Date(dateString);
      }
    },
    sortConcerts(value) {
      this.sortBy = value
    },

  },
  computed: {
    sortedConcerts() {

      const filteredConcerts = this.concerts
      let venueConcerts;

      if (this.selectedVenue !== null) {
        venueConcerts = filteredConcerts.filter(concert => concert.venueConcertsId === this.selectedVenue.id).filter(concert => checkIfAfterToday(this.extractFirstDate(concert.date)));
      } else {
        venueConcerts = filteredConcerts.filter(concert => {
          return checkIfAfterToday(this.extractFirstDate(concert.date.toUpperCase()))
        })
      }

        return venueConcerts.sort((a, b) => {
          if (this.sortBy === 'name') {
            return a.artistName.localeCompare(b.artistName);
          } else {
            const dateA = this.extractFirstDate(a.date);
            const dateB = this.extractFirstDate(b.date);
            return dateA - dateB;
          }
        });

    }
  },
  mounted() {
    this.$store.dispatch('concerts/getConcertsData')
  },
  data() {
    return {
      sortBy: 'date',
      dropdownButtons: [
        {
          label: 'Event Date',
          value: 'date'
        },
        {
          label: 'Artist Name',
          value: 'name'
        },


      ],
    }
  }
}
</script>

<style scoped>
.concert-grid {
  width: 95%;
  display: grid;
  grid-template-columns: 1fr; /* One card per row by default (mobile-first) */
  /* Adjust the gap as needed */
}

@media screen and (min-width: 768px) {
  .concert-grid {
    grid-template-columns: repeat(2, 1fr); /* Two cards in a row on screens larger than 767px */
  }
}

@media screen and (min-width: 1500px) {
  .concert-grid {
    grid-template-columns: repeat(3, 1fr); /* Three cards in a row on screens larger than 1200px */
  }
}
</style>
