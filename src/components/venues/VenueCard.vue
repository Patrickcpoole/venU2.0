<template>
  <div class="row items-start q-ma-md">
    <q-card class="venue-card" @click="handleChooseVenue">
      <q-img :src="venueData.image" style="height: 30vh;">
        <div class="venue-overlay">
          <span class="venue-name text-white text-center">{{ venueData.name }}</span>
          <div class="bottom-text">
            <span class="text-white info-text" style="margin-right:10px">{{ venueData.location }}</span>
            |
            <span class="text-white info-text" style="margin-left:10px">Capacity: {{ venueData.capacity }}</span>
          </div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "VenueCard",
  props: ["venueData"],
  methods:{
    handleChooseVenue(){
        // this.$store.dispatch('concerts/postVenueConcerts', this.venueData.concerts.items)
      this.$store.dispatch('venues/saveSelectedVenue', this.venueData)
      // this.$store.dispatch('concerts/getConcert', this.venueData.id)
      // this.$store.dispatch('concerts/getConcertsData', this.venueData.id)
      this.$router.push('/concerts')
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.venue-card {
  width: 100%;
  height: 30vh;
  cursor: pointer;
  position: relative; /* Ensure positioning context for overlay */
}

.venue-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust opacity as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.venue-name {
  font-size: 3.25em;
  line-height: 1.25em;
}

.bottom-text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.info-text {
  font-size: 1em;
}
</style>
