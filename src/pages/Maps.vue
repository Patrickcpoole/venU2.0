<template>
  <div class="full-width flex column items-center justify-center">
     <h5 class="text-white">Click/tap a venue pin for more info</h5>
    <div style="width: 95%">

    <map-maker />
      </div>
  </div>
</template>

<script>
import MapMaker from "src/components/maps/MapMaker"
export default {
  name: "Maps",
  components:{MapMaker}
}
</script>

<style scoped>

</style>
