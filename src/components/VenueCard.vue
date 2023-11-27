<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="venue-card"  @click="handleChooseVenue">
      <q-img :src="venueData.image" style=" height: 30vh;">
        <div class="venue-background">
          <span class="venue-name text-white text-center">{{ venueData.name }}</span>
          <div class="bottom-text">
            <span class="text-white info-text" style="margin-right:10px">Location: {{ venueData.location }}</span>
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
}

.venue-background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.venue-name {
  font-size: 3.5em;
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
