<template>
  <div>
<!--    <q-card class="concert-card">-->
<!--      <div class="image-container">-->
<!--        <q-img :src="concertData.image" style=" height: 20vh;"></q-img>-->
<!--      </div>-->
<!--      <div class="info-container">-->
<!--        <div class="top-info">-->
<!--          <div class="left-info">-->
<!--            <span class="concert-name">{{ concertData.name }}</span><br/>-->
<!--            <span class="concert-openers">{{ concertData.openers }}</span>-->
<!--          </div>-->
<!--          <div class="right-info">-->
<!--            <span class="day">{{ $moment(concertData.date).format('MMMM Do YYYY') }}</span>-->

<!--          </div>-->
<!--        </div>-->

<!--        <div class="button-container">-->
<!--          <q-separator dark></q-separator>-->
<!--          <q-card class="icon-container" @click="handleInterested(concertData)">-->
<!--            <q-icon size="1.5em" color="purple" name="library_add_check"/>-->
<!--            <span class="icon-text">Interested</span>-->
<!--          </q-card>-->
<!--          <q-card class="icon-container" @click="handleGoing(concertData)">-->
<!--            <q-icon size="1.5em" color="blue" name="library_add"/>-->
<!--            <span class="icon-text" @click="handleGoing(concertData)">I'm going</span>-->
<!--          </q-card>-->
<!--          <q-card class="icon-container">-->
<!--            <q-icon size="1.5em" color="green" name="book_online"/>-->
<!--            <span class="icon-text">Buy Tickets</span>-->
<!--          </q-card>-->
<!--        </div>-->
<!--      </div>-->

<!--    </q-card>-->
    <q-card class="concert-card"  @click="handleChooseConcert(concertData)" >
      <q-img :src="concertData.image" style=" height: 30vh;">
        <div class="concert-background">
          <span class="concert-name text-white text-center">{{ concertData.artistName }}</span>
          <div class="bottom-text">
            <span class="text-white info-text" style="margin-right:10px">Openers: {{ concertData.openers === '' ? 'No Openers' : concertData.openers}}</span>
            |
            <span class="text-white info-text" style="margin-left:10px">Date: {{ concertData.date }}</span>
          </div>
        </div>
      </q-img>


    </q-card>
  </div>
</template>

<script>

import { Notify } from 'quasar'

export default {
  name: "ConcertCard",
  props: ['concertData'],
  methods: {
    handleChooseConcert(concert){
      this.$store.dispatch('menu/toggleRightMenu', concert)
      this.$store.dispatch('spotify/getArtistInfo', concert.name)

    },
    handleInterested(data) {
      console.log('interested fired', data)
      this.$store.dispatch('profile/saveInterestedConcert', data)
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
      this.$store.dispatch('profile/saveGoingConcert', data)
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
.concert-card {
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

.concert-name {
  font-size: 1.25em;
}

.concert-openers {
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

//New concert styles from venue
.concert-card {
  width: 100%;
  height: 30vh;
  cursor: pointer;
}

.concert-background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.concert-name {
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
