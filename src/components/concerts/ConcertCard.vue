<template>
  <div class="row items-start q-ma-md">

    <q-card class="concert-card" @click="handleChooseConcert(concertData)">
      <q-img :src="concertData.image" style=" height: 30vh;">
         <div class="concert-overlay">

          <span class="concert-name text-white text-center">{{ concertData.artistName }}</span>
          <div class="bottom-text">
            <p class="text-white date-text" style="margin-left:10px">{{ concertData.date }}</p>
            <p class="concert-openers"
            >{{ concertData.openers === '' ? 'No Openers' : concertData.openers }}</p>

          </div>

        </div>
      </q-img>


    </q-card>
  </div>
</template>

<script>

export default {
  name: "ConcertCard",
  props: ['concertData'],
  methods: {
    handleChooseConcert(concert) {
      this.$store.dispatch('menu/toggleRightMenu', concert)
      this.$store.dispatch('spotify/getArtistInfo', concert.artistName)

    },
    handleInterested(data) {
      console.log('interested fired', data)
      this.$store.dispatch('profile/saveInterestedConcert', data)
      this.$q.notify({
        message: `${data.name} added to calendar as interested`,
        color: 'purple',
        actions: [
          {
            label: 'View Calendar', color: 'yellow', handler: () => {
              this.$router.push('/profile')
            }
          },
          {
            label: 'Dismiss', color: 'white', handler: () => { /* ... */
            }
          }
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
          {
            label: 'View Calendar', color: 'yellow', handler: () => {
              this.$router.push('/profile')
            }
          },
          {
            label: 'Dismiss', color: 'white', handler: () => { /* ... */
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped >


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
  height: 50%;
}

.left-info {
  padding-left: 5%;
  padding-right: 5%;
  height: 100%;
  padding-top: 2.5%;
}

.concert-name {
  font-size: 3.25em;
  line-height: 1em;
}

.concert-openers {
  font-size: 1.15em;
  padding-left: 15%;
  padding-right: 15%;
}

.right-info {
  padding-top: 2.5%;
  height: 100%;
  padding-right: 5%;
}

.button-container {
  background-color: #222;
  height: 50%;
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


.concert-card {
  width: 100%;
  height: 30vh;
  cursor: pointer;
  position: relative; /* Ensure positioning context for overlay */
  display: flex;
  background-color: #111;
  color: #fff;

}

.concert-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Adjust opacity as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.date-text {
  font-size: 1.5em;
}


.info-text {
  font-size: 1.1em;
}

@media screen and (max-width: 1100px) {
  .concert-name {
    font-size: 3em; /* Smaller font size for concert name */
  }

 .date-text {
    font-size: 1.3em; /* Smaller font size for date text */
  }
}


@media screen and (max-width: 768px) {
  .concert-name {
    font-size: 2.75em; /* Smaller font size for concert name */
  }

  .date-text {
    font-size: 1.2em; /* Smaller font size for date text */
  }

  .concert-openers, .info-text {
    font-size: 0.9em; /* Smaller font size for openers and info text */
  }
}

@media screen and (max-width: 480px) {
  .concert-name {
    font-size: 2.5em; /* Even smaller font size for concert name on very small screens */
  }

  .date-text {
    font-size: 1em; /* Smaller font size for date text on very small screens */
  }

  .concert-openers, .info-text {
    font-size: 0.8em; /* Smaller font size for openers and info text on very small screens */
  }
}
</style>
