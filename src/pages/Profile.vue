<template>
  <div>
    <div class="q-gutter-y-md" style="width:100%;">
      <q-tabs
        v-model="pageToggle"
        dense
        class="bg-grey-2 text-teal"
      >
        <q-tab name="profile" icon="profile" label="Profile" @click="pageToggle='profile'"/>
        <q-tab name="my-shows" icon="alarm" label="My Shows"  @click="pageToggle='my-shows'" />
      </q-tabs>
    </div>
    <div >
      <profile-page v-if="pageToggle=== 'profile'"/>
    </div>
    <div >
      <my-shows v-if="pageToggle === 'my-shows'"/>
    </div>
  </div>
</template>

<script>

import ProfilePage from "src/components/ProfilePage"
import MyShows from "src/components/MyShows"

export default {
  name: "Profile",
  components: {ProfilePage, MyShows},

  data() {
    return {
      pageToggle: 'profile'
    }
  }
}
</script>

<style scoped>

</style>
