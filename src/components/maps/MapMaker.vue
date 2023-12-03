<template>
  <div id="mapContainer">

  </div>
</template>

<script>
// Import Vue if not already imported
import Vue from 'vue';
import InfoWindowContent from './InfoWindow.vue';
import venuesState from "src/mixins/venuesState";

export default {
  name: "MapMaker",
  mixins: [venuesState],
  data() {
    return {
      google: null,
      map: null,
      markerContainer: null,
      currentVenue: null,
      venuesKey: [
        {
          id: "f79d5ac8-9148-4727-950c-f40a8faa8cac",
          coordinates: {lat: 39.7789661, lng: -104.9713729},
          address: 'The Mission Ballroom, 4242 Wynkoop St, Denver, CO 80216'
        },
        {
          id: "dd11c961-80d0-4b77-a2eb-f81d7ed5fd9e",
          coordinates: {lat: 39.6655422, lng: -105.2077865},
          address: 'Red Rocks Park and Amphitheatre, 18300 W Alameda Pkwy, Morrison, CO 80465'
        },
        {
          id: "bd7e22df-f0e4-4a9d-9b52-11655d4e49e6",
          coordinates: {lat: 39.7401744, lng: -104.9801406},
          address: 'Ogden Theatre, 935 E Colfax Ave, Denver, CO 80218'
        },
        {
          id: "0e46c338-9121-4e79-8767-6dc25cc2abf7",
          coordinates: {lat: 39.750284, lng: -105.015023},
          address: 'Ball Arena, 1000 Chopper Cir, Denver, CO 80204'
        },
        {
          id: "42fc91a7-c41b-48cb-abee-15980b9c1204",
          coordinates: {lat: 39.764248, lng: -105.0262499},
          address: 'Empower Field, 1701 Bryant St, Denver, CO 80204'
        },
         {
          id: "c94a3593-bd4b-4ce9-8294-ccfd6fd0c1cb",
          coordinates: {lat: 39.7402069, lng: -104.9821103},
          address: 'Fillmore Auditorium, 1510 N Clarkson St, Denver, CO 80218'
        },
      ],
    }
  },
  async mounted() {
    await this.$google()
    await this.initMap()

  },
  methods: {
    handleGoToConcerts() {
      this.$store.dispatch('venues/saveSelectedVenue', this.currentVenue)
      this.$router.push('/concerts')

    },
    openDirections: function (destination) {
      console.log('open directions')
      this.$q.loading.show()
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude)
            const origin = `${latitude},${longitude}`;
            const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
            window.open(url, '_blank');
             this.$q.loading.hide()
          },
          (error) => {
            console.error('Error getting current location:', error);
            // Handle the error or provide a fallback
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Handle the case where geolocation is not supported
      }

    },
    initMap: function () {
      console.log('these are the venues', this.venues)

      this.map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: {lat: 39.742043, lng: -104.991531},
        zoom: 10,
      });


      let openInfoWindow = null;
      const iconImage = 'https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/icons/icons8-stadium-windows-11-color/icons8-stadium-48.png'

      this.venuesKey.forEach((venue) => {
        const marker = new google.maps.Marker({
          icon: iconImage,
          position: venue.coordinates,
          map: this.map,
        });

        const infoWindowContentInstance = new Vue({
          render: (h) => h(InfoWindowContent, {
            props: {
              // this.venues is from venues state mixin
              currentVenue: this.venues.find((v) => v.id === venue.id),
              openDirections: () => this.openDirections(venue.address),
              handleGoToConcerts: () => this.handleGoToConcerts(),
            }
          })
        });

        infoWindowContentInstance.$mount();

        // Create an InfoWindow with the content from the Vue instance
        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContentInstance.$el,
        });

        // Use a closure to capture the correct currentVenue for each marker
        marker.addListener("click", () => {
          // Close the previous infoWindow if open
          if (openInfoWindow) {
            openInfoWindow.close();
          }

          infoWindow.open({
            anchor: marker,
            map: this.map,
            shouldFocus: false,
          });

          // Update the reference to the currently open infoWindow
          openInfoWindow = infoWindow;
        });
      });

      // Automatically adjust the map to fit all markers
      const bounds = new google.maps.LatLngBounds();
      this.venuesKey.forEach((venue) => {
        bounds.extend(new google.maps.LatLng(venue.coordinates.lat, venue.coordinates.lng));
      });
      this.map.fitBounds(bounds);
    },
  },
}
;

</script>

<style scoped>
#mapContainer {
  height: 75vh;
  margin: 1%;
  border: 5px solid black;
  border-radius: 1%;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}


</style>
