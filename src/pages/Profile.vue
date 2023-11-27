<template>

    <div class="" style="width:100%;">
       <q-tabs
        v-model="pageToggle"
        inline-label
        class="text-primary q-my-md"
      >
        <q-tab name="info" label="Info" />
        <q-tab name="calendar" label="Calendar" />
       </q-tabs>
      <profile-info  v-if="pageToggle==='info'"/>
      <my-shows v-if="pageToggle==='calendar'"/>
    </div>

</template>

<script>

import ProfileInfo from "components/profile/ProfileInfo.vue"
import MyShows from "src/components/profile/MyShows"
import {spotifyState} from "src/mixins/spotifyState";

export default {
  name: "Profile",
  components: {ProfileInfo, MyShows},
  mixins: [spotifyState],


  data() {
    return {
      pageToggle: 'info',
    }
  }
}
</script>

<style scoped>

</style>
