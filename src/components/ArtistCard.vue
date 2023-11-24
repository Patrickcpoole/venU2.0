<template>
  <div>
<!--    <q-card class="artist-card">-->
<!--      <div class="image-container">-->
<!--        <q-img :src="artistData.image" style=" height: 20vh;"></q-img>-->
<!--      </div>-->
<!--      <div class="info-container">-->
<!--        <div class="top-info">-->
<!--          <div class="left-info">-->
<!--            <span class="artist-name">{{ artistData.name }}</span><br/>-->
<!--            <span class="artist-openers">{{ artistData.openers }}</span>-->
<!--          </div>-->
<!--          <div class="right-info">-->
<!--            <span class="day">{{ $moment(artistData.date).format('MMMM Do YYYY') }}</span>-->

<!--          </div>-->
<!--        </div>-->

<!--        <div class="button-container">-->
<!--          <q-separator dark></q-separator>-->
<!--          <q-card class="icon-container" @click="handleInterested(artistData)">-->
<!--            <q-icon size="1.5em" color="purple" name="library_add_check"/>-->
<!--            <span class="icon-text">Interested</span>-->
<!--          </q-card>-->
<!--          <q-card class="icon-container" @click="handleGoing(artistData)">-->
<!--            <q-icon size="1.5em" color="blue" name="library_add"/>-->
<!--            <span class="icon-text" @click="handleGoing(artistData)">I'm going</span>-->
<!--          </q-card>-->
<!--          <q-card class="icon-container">-->
<!--            <q-icon size="1.5em" color="green" name="book_online"/>-->
<!--            <span class="icon-text">Buy Tickets</span>-->
<!--          </q-card>-->
<!--        </div>-->
<!--      </div>-->

<!--    </q-card>-->
    <q-card class="artist-card"  @click="handleChooseArtist(artistData)" >
      <q-img :src="artistData.image" style=" height: 30vh;">
        <div class="artist-background">
          <span class="artist-name text-white text-center">{{ artistData.name }}</span>
          <div class="bottom-text">
            <span class="text-white info-text" style="margin-right:10px">Openers: {{ artistData.openers === '' ? 'No Openers' : artistData.openers}}</span>
            |
            <span class="text-white info-text" style="margin-left:10px">Date: {{ artistData.date }}</span>
          </div>
        </div>
      </q-img>


    </q-card>
  </div>
</template>

<script>

import { Notify } from 'quasar'

export default {
  name: "ArtistCard",
  props: ['artistData'],
  methods: {
    handleChooseArtist(artist){
      this.$store.dispatch('menu/toggleRightMenu', artist)
      this.$store.dispatch('spotify/getArtistInfo', artist.name)

    },
    handleInterested(data) {
      console.log('interested fired', data)
      this.$store.dispatch('profile/saveInterestedArtist', data)
      this.$q.notify({
        message: `${data.name} added to calendar as interested`,
        color: 'purple',
        actions: [
          { label: 'View Calendar', color: 'yellow', handler: () => { this.$router.push('/profile')} },
          { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
      })
    },
    handleGoing(data) {
      console.log('going fired', data)
      this.$store.dispatch('profile/saveGoingArtist', data)
      this.$q.notify({
        message: `${data.name} added to calendar as going`,
        color: 'blue',
        actions: [
          { label: 'View Calendar', color: 'yellow', handler: () => { this.$router.push('/profile')} },
          { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.artist-card {
  width: 100%;
  height: 20vh;
  display: flex;
  background-color: #111;
  color: #fff;
  margin-top: 5%;
}

.image-container {
  height: 15vh;
  display: flex;
  width: 35%;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 65%;
  height: 100%;
}

.top-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height:50%;
}

.left-info {
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
 padding-top: 2.5%;
}

.artist-name {
  font-size: 1.25em;
}

.artist-openers {
  font-size: .85em;
}

.right-info {
  padding-top: 2.5%;
  height: 100%;
  padding-right: 5%;
}

.button-container {
  background-color: #222;
 height:50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid grey;
  border-bottom-right-radius: 5px;
}

.icon-container {
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 5%;
  cursor: pointer;
}

.icon-text {
  margin-top: 5px;
  font-size: .8em;
}

//New artist styles from venue
.artist-card {
  width: 100%;
  height: 30vh;
  cursor: pointer;
}

.artist-background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.artist-name {
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
