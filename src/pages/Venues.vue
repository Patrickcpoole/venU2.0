<template>
  <div style="min-height: 85vh">
    <div
      v-if="loading"
      class="full-width full-height flex column justify-center items-center"
      style="min-height: 85vh"
    >
      <q-spinner color="primary" size="100px" />
    </div>
    <div v-else class="full-width flex column justify-start items-center">
      <p class="text-center text-white q-mt-lg text-subtitle1">
        {{ $q.platform.is.mobile ? "Tap" : "Click" }} a venue to view upcoming
        shows
      </p>

      <button-dropdown @sort="sortVenues" :dropdown-buttons="dropdownButtons" />

      <div class="venue-grid">
        <div v-for="venue in sortedVenues" :key="venue.id">
          <venue-card :venueData="venue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VenueCard from "components/venues/VenueCard";
import venuesState from "../mixins/venuesState";
import spotifyState from "../mixins/spotifyState";
import ButtonDropdown from "components/menu/ButtonDropdown.vue";

// deploing!
export default {
  name: "Venues",
  components: { VenueCard, ButtonDropdown },
  mixins: [spotifyState, venuesState],
  data() {
    return {
      loading: false,
      dropdownButtons: [
        {
          label: "Popularity",
          value: "popular",
        },
        {
          label: "Venue Name",
          value: "name",
        },
        {
          label: "Capacity",
          value: "capacity",
        },
      ],
      sortBy: "popularity",
    };
  },
  computed: {
    sortedVenues() {
      let sorted = [...(this.venues || [])];

      if (this.sortBy === "name") {
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortBy === "capacity") {
        return sorted.sort((a, b) => {
          const capacityA = parseInt(a.capacity, 10);
          const capacityB = parseInt(b.capacity, 10);
          return capacityB - capacityA;
        });
      } else {
        // Custom sorting for specific venue names
        const popularVenuesOrder = [
          "Red Rocks Ampitheatre",
          "Mission Ballroom",
          "Ball Arena",
          "Empower Field at Mile High",
        ];

        return sorted.sort((a, b) => {
          const aIndex = popularVenuesOrder.indexOf(a.name);
          const bIndex = popularVenuesOrder.indexOf(b.name);

          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          } else if (aIndex !== -1) {
            return -1;
          } else if (bIndex !== -1) {
            return 1;
          } else {
            // If neither venue is in the popular order, sort alphabetically
            return a.name.localeCompare(b.name);
          }
        });
      }
    },
  },
  methods: {
    sortVenues(value) {
      this.sortBy = value;
    },
  },
  async mounted() {
    console.log("mounting");
    this.loading = true;

    try {


      // if (!token) { // If there's no token already, try to get it
      //   const response = await this.$store.dispatch("spotify/getAccessToken", this.$route.query);
      //   console.log('response', response)
      //   token = response; // Use the token from the response
      // }

 
        // If there's no token already, try to get it
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get("code");

       await this.$store.dispatch(
          "spotify/getAccessTokenFromCode",
          code
        );
     
        await this.$store.dispatch("spotify/getSpotifyUserInfo");


      await this.$store.dispatch("venues/saveSelectedVenue", null);
      await this.$store.dispatch("venues/getVenuesData");
      await this.$store.dispatch("underground/listPosts");
      await this.$store.dispatch("profile/checkAllInteractions");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.venue-grid {
  width: 95%;
  display: grid;
  grid-template-columns: 1fr; /* One card per row by default (mobile-first) */
}

@media screen and (min-width: 768px) {
  .venue-grid {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* Two cards in a row on screens larger than 767px */
  }
}

@media screen and (min-width: 1500px) {
  .venue-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Three cards in a row on screens larger than 1200px */
  }
}
</style>
