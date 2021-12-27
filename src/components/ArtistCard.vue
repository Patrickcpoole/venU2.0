<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="artist-card" v-for="(artist, index) in artistData" :key="index">
      <div class="image-container">
        <q-img :src="artist.image" style=" height: 20vh;"></q-img>
      </div>
      <div class="info-container">
        <div class="top-info">
          <div class="left-info">
            <span class="artist-name">{{ artist.name }}</span><br/>
            <span class="artist-openers">{{ artist.openers }}</span>
          </div>
          <div class="right-info">
            <span class="day">{{ artist.date }}</span>

          </div>
        </div>
        <q-separator dark></q-separator>
        <div class="button-container">
          <q-card class="icon-container">
            <q-icon size="1.5em" color="purple" name="library_add_check"/>
            <span class="icon-text">Interested</span>
        </q-card>
          <q-card class="icon-container">
            <q-icon size="1.5em" color="blue" name="library_add"/>
            <span class="icon-text">I'm going</span>
          </q-card>
          <q-card class="icon-container">
            <q-icon size="1.5em" color="green" name="book_online"/>
            <span class="icon-text">Buy Tickets</span>
          </q-card>
        </div>
      </div>

    </q-card>
  </div>
</template>

<script>
export default {
  name: "ArtistCard",
  props: ['artistData']
}
</script>

<style scoped>
.artist-card {
  width: 100%;
  height: 20vh;
  display: flex;
  background-color: #1D1D1D;
  color: #fff;

}

.image-container {
  height: 15vh;
  display: flex;
  width: 35%;
}

.info-container {
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;

}

.top-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.left-info {
  margin-left: 5%;
  margin-top: 5%;

  height: 100%;

}

.artist-name {
  font-size: 1.5em;
}

.artist-openers {
  font-size: .85em;
}

.right-info {
  margin-top: 5%;
  height: 100%;
  padding-right: 5%;
}

.button-container {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}

.icon-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding:2%;
  cursor: pointer;
}

.icon-text {
  margin-top: 5%;
  font-size: .8em;
}
</style>
