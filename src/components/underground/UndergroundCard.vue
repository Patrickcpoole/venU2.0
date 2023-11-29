<template>

  <q-card class="underground-card">
    <q-card-section>
      <div class="top-info">
        <q-avatar size="75px">
          <q-img :src="postData.profilePicture" height="75px" width="75px"></q-img>
        </q-avatar>
        <div class="flex column justify-center q-ml-md full-height">
          <span class="text-h5">{{ postData.userName }}</span>
          <span style="font-size: 1em">{{ formatDate(postData.datePosted) }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <p style="font-size:1.2em">{{ postData.text }}</p>
      <q-img
        v-if="postData.photoUrl !== null"
        :src="postData.photoUrl"/>
      <q-video
        v-if="postData.videoUrl !== null"
        :src="postData.videoUrl"
        :ratio="16/9"
      />
    </q-card-section>

    <q-card-section class="flex row justify-between items-center">

      <div class="like-count flex row justify-between items-center" v-if="postData.likes > 0">
        <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 18px; padding-right: 8px;"/>
        Patrick Poole and {{ postData.likes }} others thinks this rocks
      </div>
      <span><q-btn v-if="postData.comments.length > 0" flat :label="`${postData.comments.length} Comments`"
                   @click="toggleCommentSection"/></span>

    </q-card-section>
    <q-separator color="white"/>
    <q-card-actions align="right" class="full-width flex row justify-center items-end">


      <div class="flex justify-center items-center" @click="toggleLike">
        <q-btn
          flat
          outline
          label="Rock On"
          :color="isLiked ? 'positive' : ''">
          <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 18px; padding: 8px;"/>
        </q-btn>
      </div>

      <q-btn icon-right="chat" flat label="Comment" @click="toggleUserCommentSection"/>
      <q-btn icon-right="calendar_month" flat label="Save"/>
      <q-btn icon-right="share" flat label="Share" @click="sharePost"/>
    </q-card-actions>
    <div class="user-comment-section" v-if="showUserComment">
      <q-input
        style="flex: 6"

        dark
        v-model="userComment"
        label="Your Comment"

        @input="handleCommentInput"
      />

      <q-btn icon="send" flat outline @click="postComment" color="primary"/>
    </div>

   <!-- Comment Section -->
<q-card-section v-if="showComments" class="comment-section">
  <!-- Render comments and replies using a new component -->
  <comment-section :comments="postData.comments"/>
</q-card-section>
  </q-card>
</template>

<script>

import CommentSection from './CommentSection.vue';
export default {
  name: "UndergroundCard",
  components: {
    CommentSection,
  },
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
      likeCount: this.postData.likes.length,
      showComments: false,
      showUserComment: false,
      userComment: "",
    };
  },
  methods: {
    formatDate(date) {
      // Implement a date formatting function if needed
      return date.toLocaleString();
    },
    toggleUserCommentSection() {
      this.showUserComment = !this.showUserComment;
    },

    handleCommentInput(value) {
      this.userComment = value;
    },

    postComment() {
      // Implement logic to post the comment
      console.log("Comment posted:", this.userComment);
      // Clear the comment input and hide the user comment section
      this.userComment = "";
      this.showUserComment = false;
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.likeCount++;
        // You may want to send a request to the server to update likes
        // Example: this.$emit('like', this.postData.id);
      } else {
        this.likeCount--;
        // You may want to send a request to the server to update likes
        // Example: this.$emit('unlike', this.postData.id);
      }
    },
    toggleCommentSection() {
      this.showComments = !this.showComments;
    },
    sharePost() {
      // Implement share functionality (e.g., copy to clipboard, share API, etc.)
      // You can use a library like clipboard.js for easy copy-to-clipboard functionality
      // Example: copyToClipboard(this.postData.shareableLink);
      console.log("Post shared!");
    },
  },
};
</script>

<style scoped lang="scss">
.underground-card {
  background-color: #555555;
  color: #fff;

  max-width: 600px;
  margin-bottom: 2.5%;
}

.top-info {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 75px;
  width: 100%;


}

.like-count {
  margin-left: 8px;
  font-size: 14px;
}

.comment-section {
  background-color: #333333;
  padding: 10px;
  margin-top: 10px;
}


.custom-button {
  cursor: pointer;
  transition: background-color 0.3s; /* You can adjust the transition duration as needed */

  &:hover {
    background-color: #999999; /* Add your desired hover color here */
  }
}

.user-comment-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
  margin-top: 10px;
}

</style>
