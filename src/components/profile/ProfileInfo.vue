<template>
  <div class="profile-container">

    <div class="q-pa-md flex column justify-center items-center">
      <q-avatar size="150px" class="q-my-md">
        <q-icon name="account_circle" size="2em" v-show="spotifyUserInfo.images.length === 0"/>
        <q-img v-show="spotifyUserInfo.images.length > 0" :src="spotifyUserInfo.images[1].url" height="150px"
               width="150px"/>

      </q-avatar>
      <span class="text-white text-h5">{{ spotifyUserInfo.display_name }}</span>
      <span class="text-white text-h6">{{ user.attributes.email }}</span>
      <a :href="spotifyUserInfo.external_urls.spotify" target="_blank">
        <q-btn color="primary" size="md" class="q-mt-md">
          <q-img
            class="q-my-md"
            src="https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/icons/icons8-spotify-96-transparent.png"
            height="30px" width="30px"/>
          <span class="text-white q-px-sm" style="font-size: 1.25em">View Spotify</span>
        </q-btn>
      </a>
    </div>
  </div>
</template>

<script>


import spotifyState from "src/mixins/spotifyState"
import authState from "src/mixins/authState"


export default {
  name: "ProfileInfo",
  components: {},
  mixins: [spotifyState, authState],

}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
