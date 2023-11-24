<template>
  <div>
    <q-card class="artist-card">
      <div class="image-container">
        <q-img :src="artistData.image"></q-img>
      </div>
      <q-list bordered class="rounded-borders" dark>
        <q-expansion-item
          expand-separator
          icon="feed"
          label="Show Info"
          dark
        >
          <q-card dark>
            <q-card-section dark>
              <div class="info-container">

                <div class="left-info">
                  <span class="artist-name">{{ artistData.name }}</span><br/>
                  <span class="artist-openers">{{ artistData.openers }}</span>
                  <span class="venue-name">Mission Ballroom</span>
                  <div class="button-container">
                    <q-separator dark></q-separator>
                    <q-card class="icon-container" @click="handleInterested(artistData)">
                      <q-icon size="1.5em" color="purple" name="library_add_check"/>
                      <span class="icon-text">Interested</span>
                    </q-card>
                    <q-card class="icon-container" @click="handleGoing(artistData)">
                      <q-icon size="1.5em" color="blue" name="library_add"/>
                      <span class="icon-text" @click="handleGoing(artistData)">I'm going</span>
                    </q-card>
                    <q-card class="icon-container">
                      <q-icon size="1.5em" color="green" name="book_online"/>
                      <span class="icon-text">Buy Tickets</span>
                    </q-card>
                  </div>
                </div>
                <div class="right-info">
                  <span class="label">Date</span>
                  <span class="day">{{ $moment(artistData.date).format('MMMM Do YYYY') }}</span>
                  <span class="time">8:00 PM</span>
                  <span class="label">Age</span>
                  <span class="time">16 and over</span>
                  <span class="label">Advance</span>
                  <span class="time">$29.50 - $79.00</span>
                  <span class="label">Day of show</span>
                  <span class="time">$40.00 - $79.00</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="play_circle"
          label="Music"
        >
          <q-card>
            <q-card-section>
              <q-video
                :ratio="16/9"
                :src="artistData.youtube"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="groups"
          label="Social"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>

import {Notify} from 'quasar'

export default {
  name: "ProfileArtistCard",
  props: ['artistData'],
  methods: {}
}
</script>

<style scoped lang="scss">
.artist-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #1D1D1D;
  color: #fff;
  margin-top: 5%;
}

.image-container {
  display: flex;
  width: 100%;
}

.info-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;


}

.top-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50%;
}

.left-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 70%;
}

.artist-name {
  font-size: 2em;
}

.venue-name {
  font-size: 1.5em;
}

.artist-openers {
  font-size: 1em;
}

.right-info {
  display: flex;
  flex-direction: column;
  padding-top: 2.5%;
  height: 100%;
  padding-right: 5%;
  width: 30%;
}

.label {
  color: #34887b;
  font-weight: bold;
}

.button-container {
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  padding: 2.5%;
  cursor: pointer;
}

.icon-text {
  margin-top: 5px;
  font-size: .8em;
}
</style>
