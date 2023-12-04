<template>
  <div id="infoWindowContent">
    <div id="imageContainer" style="width: 100%;">
      <img :src="currentVenue.image" style="height: 20vh; width: 100%;" />
    </div>
    <div id="contentContainer" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center">
      <span id="firstHeading" class="text-h4 q-my-sm font-normal text-weight-light">{{ currentVenue.name }}</span>
      <div id="bodyContent" style="display: flex; justify-content: center; align-items: center; flex-direction: column">
        <p style="font-size: 1.25em; font-weight: 500">{{currentVenue.location}} | Capacity: {{ currentVenue.capacity }}</p>
        <q-btn @click="handleGoToConcerts(currentVenue)" type="button" label="Concerts" icon="audiotrack" color="primary"/>
        <q-btn @click="openDirections" type="button" label="Directions" icon="location_on" color="primary" class="q-my-md"/>

      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "InfoWindow",
  props: {
    handleGoToConcerts: Function, // Pass the handleGoToConcerts method as a prop
    openDirections: Function, // Pass the openDirections method as a prop
    currentVenue: Object, // Pass the currentVenue object as a prop
  },

  methods: {

  }
};
</script>

<style scoped>
#infoWindowContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#imageContainer {
  width: 50%;

}

#contentContainer {
  width: 50%;

}
</style>
