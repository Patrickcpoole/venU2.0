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
        <div v-for="event in eventsOnChosenDate" :key="event.id" class="q-pa-md full-width">
    <component :is="cardComponent(event)" :postData="getPostData(event)" :concertData="getConcertData(event)" />
  </div>


    </div>

</template>

<script>
import { profileState } from "src/mixins/profileState";
import { menuState } from "src/mixins/menuState";
import ConcertCard from "src/components/concerts/ConcertCard";
import UndergroundCard from "components/underground/UndergroundCard.vue";

export default {
  name: "MyShows",
  components: { ConcertCard, UndergroundCard },
  mixins: [profileState, menuState],

  data() {
    return {
      currentDate: this.$date.formatDate(new Date(), 'YYYY/MM/DD'),
      eventsOnChosenDate: []
    };
  },
  mounted() {
    let sorted = [...this.allEvents];
    sorted.sort((a, b) => this.$date.getDateDiff(new Date(a.date || a.eventDate), new Date(b.date || b.eventDate), 'seconds'));
    this.handleChooseDate(sorted[0]['date'] || sorted[0]['eventDate']);
    console.log('params', this.$route.params);
  },
  methods: {
     cardComponent(event) {
      console.log('event card component', event)
      return event.text ? UndergroundCard : ConcertCard;
    },
    getPostData(event) {
      return event.text ? event : null;
    },
    getConcertData(event) {
      return event.text ? null : event;
    },
    allEventDates() {
      return this.allEvents.map(event => this.$date.formatDate(event['date'] || event['eventDate'], 'YYYY/MM/DD'));
    },
    handleChooseDate(value) {
      const formattedValue = this.$date.formatDate(value, 'YYYY/MM/DD');
      this.currentDate = formattedValue;
      this.allEvents.forEach(event => {
        const eventDate = event['date'] || event['eventDate'];
        console.log('event', this.$date.formatDate(eventDate, 'YYYY/MM/DD'));


        console.log('formatted value', formattedValue);
        if (this.$date.formatDate(eventDate, 'YYYY/MM/DD') === formattedValue && !this.eventsOnChosenDate.includes(event)) {
          console.log('these are the same');
          this.eventsOnChosenDate.push(event);
          console.log('events on chosen date', this.eventsOnChosenDate);
        }
      });
    },
    goingEventDates() {
      return this.goingEvents.map(goingEvent => this.$date.formatDate(goingEvent['date'] || goingEvent['eventDate'], 'YYYY/MM/DD'));
    },
    interestedEventDates() {
      return this.interestedEvents.map(interestedEvent => this.$date.formatDate(interestedEvent['date'] || interestedEvent['eventDate'], 'YYYY/MM/DD'));
    },

    eventColors(date) {
      console.log('event colors fired', date);
      let color = '';
      if (this.goingEventDates.includes(date)) {
        console.log('its blue!');
        color = 'blue';
      } else if (this.interestedEventDates.includes(date)) {
        console.log('its purple!');
        color = 'purple';
      } else {
        console.log('its red!');
        color = 'orange';
      }

      return color;
    },
  }
};
</script>

