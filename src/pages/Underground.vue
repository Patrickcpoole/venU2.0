<template>
  <div class="q-pa-md flex column justify-center items-center full-width" >
    <q-btn label="Create Post" class="q-my-md" @click="toggleCreatePostModal" color="blue" icon-right="add"/>
    <q-btn-dropdown color="primary" class="q-mb-md" :label="`Sort by ${sortBy}`">
      <q-list>
        <q-item clickable v-close-popup @click="sortPosts('New')">
          <q-item-section>
            <q-item-label>Popularity</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="sortPosts('Popularity')">
          <q-item-section>
            <q-item-label>Capacity</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="sortPosts('alphabetically')">
          <q-item-section>
            <q-item-label>Alphabetically</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <div v-for="post in postData" :key="post.id" class="flex column justify-center items-center full-width">
      <underground-card :postData="post"/>
    </div>
    <create-post-modal @closeModal="toggleCreatePostModal" :toggleCreatePost="toggleCreatePost"  />
  </div>
</template>

<script>

import UndergroundCard from '../components/underground/UndergroundCard.vue'
import CreatePostModal from "../components/underground/CreatePostModal.vue";
export default {
  name: "Underground",
  components: {
    UndergroundCard,
    CreatePostModal
  },
  methods: {
    toggleCreatePostModal() {
      console.log('toggleCreatePostModal')
      this.toggleCreatePost = !this.toggleCreatePost;
    },
    sortPosts(sortBy) {
      this.sortBy = sortBy;
    },
  },
  data() {
    return {
      toggleCreatePost: false,
      sortBy: 'New',
      postData: [{
        id: 1,
        userName: "Cous",
        profilePicture: "https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/userTestPhotos/FINAL.webp",
        datePosted: new Date(),
        text: "Hey everybody! I'm playing a SoFar show in Denver on 12/10. Come check it out!",
        photoUrl: "https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/userTestPhotos/sofar-middle-man.jpg",
        videoUrl: null,
        ticketUrl: "https://www.sofarsounds.com/events/51811",
        likes: 5,
        comments: [
          {
            id: 1, // Unique identifier for the comment
            text: "Sounds fun! I'll be there!", // The actual text of the comment
            userId: "us-east-1:1ac3febc-8749-4f70-8d28-01dace4f567e", // User ID of the commenter
            createdAt: new Date(), // Timestamp indicating when the comment was created
            updatedAt: new Date(), // Timestamp indicating when the comment was last updated
            userName: 'ppoole',
            profilePicture: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-1/154908070_10218765451437259_3882560715028633094_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=0be577&_nc_ohc=P_R39Xz4WLsAX_eN-l-&_nc_ht=scontent-lga3-1.xx&edm=AP4hL3IEAAAA&oh=00_AfA9a0XS8RQtTVWIp5r7w_92NRy3c4BrgXkL4Wlpf0TClw&oe=658C4038",
            replies: [
              {
                id: 3, // Unique identifier for the comment
                text: "I'm going too! Let's meet up beforehand and head there together!", // The actual text of the comment
                userId: "us-east-1:1ac3febc-8749-4f70-8d28-01dace4f567e", // User ID of the commenter
                createdAt: new Date(), // Timestamp indicating when the comment was created
                updatedAt: new Date(), // Timestamp indicating when the comment was last updated
                userName: 'ppoole',
                profilePicture: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-1/154908070_10218765451437259_3882560715028633094_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=0be577&_nc_ohc=P_R39Xz4WLsAX_eN-l-&_nc_ht=scontent-lga3-1.xx&edm=AP4hL3IEAAAA&oh=00_AfA9a0XS8RQtTVWIp5r7w_92NRy3c4BrgXkL4Wlpf0TClw&oe=658C4038",
                replies: [],
                parentId: 1, // ID of the parent comment (null if it's a top-level comment)
              },
            ],
            parentId: null, // ID of the parent comment (null if it's a top-level comment)
          },
          {
            id: 2, // Unique identifier for the comment
            text: "I can't make it but I know you will absolutely crush this set! Good Luck!", // The actual text of the comment
            userId: "us-east-1:1ac3febc-8749-4f70-8d28-01dace4f567e", // User ID of the commenter
            createdAt: new Date(), // Timestamp indicating when the comment was created
            updatedAt: new Date(), // Timestamp indicating when the comment was last updated
            userName: 'ppoole',
            profilePicture: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.6435-1/154908070_10218765451437259_3882560715028633094_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=0be577&_nc_ohc=P_R39Xz4WLsAX_eN-l-&_nc_ht=scontent-lga3-1.xx&edm=AP4hL3IEAAAA&oh=00_AfA9a0XS8RQtTVWIp5r7w_92NRy3c4BrgXkL4Wlpf0TClw&oe=658C4038",
            replies: [],
            parentId: null, // ID of the parent comment (null if it's a top-level comment)
          }
        ]
      }, {
        id: 2,
        userName: "Weir",
        profilePicture: "https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/userTestPhotos/avatars-6QoQw3HlAHZTUyeT-uzLneQ-t240x240.jpg",
        datePosted: new Date(),
        text: "New show announcement! I'm playing a DJ set at my homies house this weekend. Message me for details!",
        // photoUrl: "https://amplify-venu20-dev-131644-deployment.s3.amazonaws.com/userTestPhotos/hqdefault.jpg",
        photoUrl: null,
        videoUrl: "https://www.youtube.com/embed/thnIrxAg5Z0?si=vRxJCr_bGkKALPcq",
        ticketUrl: "https://larimerlounge.com/",
        likes: 12,
        comments: []
        // Add other properties like photoUrl if needed
      }],
    };
  },
}
</script>

<style scoped>

</style>
