<template>
  <div id="mapContainer">

  </div>
</template>

<script>
function myFunction() {
        console.log('this is a test')
      }
export default {
  name: "MapMaker",
  data() {
    return {
      google: null,
      map: null,
    }
  },
  async mounted() {
    await this.$google()
    await this.initMap()

  },
  methods: {
   myFunction() {
        console.log('this is a test')
      },
    goToArtists: function () {
      console.log('going to artists')
    },
    initMap: function () {

      this.map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: {lat: 39.742043, lng: -104.991531},
        zoom: 11,
      });
      const missionBallroom = {lat: 39.7789661, lng: -104.9713729};

      const marker = new google.maps.Marker({
        position: missionBallroom,
        map: this.map,
      });



      const contentString =
        '<div id="markerContainer" style="display: flex"; justify-content: center; width="100%">' +
        '<div id="imageContainer" style="width: 50%;">' +
        '<img src="https://venuephotos1.s3.amazonaws.com/mission-ballroom.jpg" style="height: 20vh; width: 100%;" />' +
        "</div>" +
        '<div id="contentContainer" style="width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center">' +
        '<h3 id="firstHeading" class="firstHeading" style="font-size:24px">Mission Ballroom</h3>' +
        '<div id="bodyContent" style="display: flex; justify-content: center; align-items: center; flex-direction: column">' +
        '<p>Location: Denver | Capacity: 3,950</p>' +
        `<a href="http://localhost:8080/#/artists">` +
        '<button type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-secondary text-white q-btn--actionable q-focusable q-hoverable q-btn--wrap">' +
        '<span class="q-btn__wrapper col row q-anchor--skip">' +
        '<span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">' +
        '<span>Artists</span>' +
        '<i aria-hidden="true" role="img" class="material-icons q-icon notranslate on-right">audiotrack</i>'
      '</button>' +
          "</a>"+
        "</span>" +
      "</span>" +
      "</div>" +
      "</div>" +
      "</div>";
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map: this.map,
          shouldFocus: false,
        });
      });
    }
  }
  //
  // this.map.mapTypes.set('data_map', new window.google.maps.StyledMapType(this.styledMapType, {name: ''}))
  // this.map.setMapTypeId('data_map');
  //
  // this.mgr = new MarkerManager(this.map)
  // this.mapPoints.slice(0, this.mapSettings.dotLimit)
  //
  // this.map.setCenter(new google.maps.LatLng(this.mapPoints[1].bl_lat, this.mapPoints[1].bl_long))
  //
  // this.drawPoints()


}
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

#markerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#imageContainer {
  width: 50%;
  background-color: red;
}

#contentContainer {
  width: 50%;
  background-color: blue;
}

</style>
