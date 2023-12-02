<template>
  <div class="flex column justify-center items-center q-mt-lg">


    <q-date
      @input="(date) => handleChooseDate(date)"
      v-model="currentDate"
      :events="allEventDates"
      :event-color="(date) => eventColors(date)"
      dark
      landscape
    />
    <div class="concert-grid">
    <div v-for="event in eventsOnChosenDate" :key="event.id" class="q-pa-md concert-container">
      <component :is="cardComponent(event)" :postData="getPostData(event)" :concertData="getConcertData(event)"/>
    </div>
      </div>


  </div>

</template>

<script>
import profileState from "src/mixins/profileState";
import menuState from "src/mixins/menuState";
import ConcertCard from "src/components/concerts/ConcertCard";
import UndergroundCard from "components/underground/UndergroundCard.vue";

export default {
  name: "MyShows",
  components: {ConcertCard, UndergroundCard},
  mixins: [profileState, menuState],

  data() {
    return {
      currentDate: this.$date.formatDate(new Date(), 'YYYY/MM/DD'),
      eventsOnChosenDate: [],

    };
  },

  mounted() {
    console.log('query', this.$route.query);
    if (this.$route.query.date) {
      console.log('query date', this.$route.query.date)
      this.handleChooseDate(this.$route.query.date);
    } else {
      let sorted = [...this.allEvents];
      sorted.sort((a, b) => this.$date.getDateDiff(new Date(a.date || a.eventDate), new Date(b.date || b.eventDate), 'seconds'));
      this.handleChooseDate(sorted[0]['date'] || sorted[0]['eventDate']);
    }


  },
  computed: {
    interactions() {
      return this.$store.state.interactions;
    },

    allEventDates() {
      return this.allEvents.map(event => this.$date.formatDate(this.extractFirstDate(event['date'] || event['eventDate']), 'YYYY/MM/DD'));
    },
    goingEventDates() {
      return this.goingEvents.map(goingEvent => this.$date.formatDate(this.extractFirstDate(goingEvent['date'] || goingEvent['eventDate']), 'YYYY/MM/DD'));
    },
    interestedEventDates() {
      return this.interestedEvents.map(interestedEvent => this.$date.formatDate(this.extractFirstDate(interestedEvent['date'] || interestedEvent['eventDate']), 'YYYY/MM/DD'));
    },
  },
  watch: {
    interactions: function (newValue, oldValue) {
      // Do something when the state variable changes

     console.log('STATE CHANGEd', newValue, oldValue)
    },
  },
  methods: {
    cardComponent(event) {

      return event.text ? UndergroundCard : ConcertCard;
    },
    getPostData(event) {
      return event.text ? event : null;
    },
    getConcertData(event) {
      return event.text ? null : event;
    },
    extractFirstDate(dateString) {

      if (typeof dateString === "string" && dateString.includes('&')) {

        const firstDate = dateString.split('&')[0].trim();
        const dateArray = dateString.split(' ');
        const year = dateArray[4]

        return new Date(`${firstDate}, ${year}`);
      } else {
        // If "&" is not present, parse the entire date string
        return new Date(dateString);
      }
    },

    handleChooseDate(value) {

      this.eventsOnChosenDate = [];
      const formattedValue = this.$date.formatDate(value, 'YYYY/MM/DD');
      this.currentDate = formattedValue;
      this.allEvents.forEach(event => {
        const eventDate = event['date'] || event['eventDate'];

        if (this.$date.formatDate(eventDate, 'YYYY/MM/DD') === formattedValue && !this.eventsOnChosenDate.includes(event)) {

          this.eventsOnChosenDate.push(event);

        }
      });
    },


    eventColors(date) {

      let color = '';
      if (this.goingEventDates.includes(date)) {

        color = 'blue';
      } else if (this.interestedEventDates.includes(date)) {

        color = 'purple';
      } else {

        color = 'orange';
      }

      return color;
    },
  }
};
</script>

<style scoped>
.concert-grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  /* Adjust the gap as needed */
}

.concert-container {

  width: 482px;

}


</style>

