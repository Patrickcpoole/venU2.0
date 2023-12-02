<template>
  <div class="q-pa-md flex column justify-center items-center full-width" >
    <q-btn label="Create Post" class="q-my-md" @click="toggleCreatePostModal" color="blue" icon-right="add"/>
    <button-dropdown :dropdownButtons="dropdownButtons" @sort="sortPosts"/>
    <div v-for="post in sortedPosts" :key="post.id" class="flex column justify-center items-center full-width">
      <underground-card :postData="post" :key="post.id"/>
    </div>
    <create-post-modal @closeModal="toggleCreatePostModal" :toggleCreatePost="toggleCreatePost"  />
  </div>
</template>

<script>

import UndergroundCard from '../components/underground/UndergroundCard.vue'
import CreatePostModal from "../components/underground/CreatePostModal.vue";
import undergroundState from "src/mixins/undergroundState";
import ButtonDropdown from "components/menu/ButtonDropdown.vue";
import { date } from 'quasar';
export default {
  name: "Underground",
  mixins: [undergroundState],
  components: {
    ButtonDropdown,
    UndergroundCard,
    CreatePostModal
  },

  computed: {
    sortedPosts() {
  let sorted = [...this.posts];

  if (this.sortBy === 'new') {
    return sorted.sort((a, b) => date.getDateDiff(new Date(b.datePosted), new Date(a.datePosted), 'seconds'));
  } else if (this.sortBy === 'event_date') {
    return sorted.sort((a, b) => date.getDateDiff(new Date(a.eventDate), new Date(b.eventDate), 'seconds'));
  } else if (this.sortBy === 'popular') {
      return sorted.sort((a, b) => {
        const aScore = a.likes + a.comments.length;
        const bScore = b.likes + b.comments.length;
        return bScore - aScore;
      });
    } else {
    return sorted.sort((a, b) => date.getDateDiff(new Date(a.datePosted), new Date(b.datePosted), 'seconds'));
  }
}
  },
  methods: {
    toggleCreatePostModal() {
      console.log('toggleCreatePostModal')
      this.toggleCreatePost = !this.toggleCreatePost;
    },
    sortPosts(value) {
      this.sortBy = value
     console.log('sort posts value', value)
    },

  },
  data() {
    return {
      sortBy: 'new',
      dropdownButtons: [
        {
          label: 'New',
          value: 'new'
        },
        {
          label: 'Event Date',
          value: 'event_date'
        },
        {
          label: 'Popular',
          value: 'popular'
        },
      ],
      toggleCreatePost: false,
    }
  }
}
</script>

<style scoped>

</style>
