<template>

  <q-card class="underground-card">
    <q-card-section>
      <div class="top-info">
        <div class="flex row justify-start">
          <q-avatar size="75px">
            <q-img :src="postData.profilePicture" height="75px" width="75px"></q-img>
          </q-avatar>
          <div class="flex column justify-center q-ml-md full-height">
            <span class="text-h5">{{ postData.userName }}</span>
            <span style="font-size: 1em">{{ formatPostedDate(postData.datePosted) }}</span>
          </div>
        </div>
        <div class="event-date-rectangle">
          <div class="flex row justify-center items-center">
            <div class="day-of-week">{{ formatEventDayOfWeek(postData.eventDate) }}</div>
            <div class="day-of-month">{{ formatEventDayOfMonth(postData.eventDate) }}</div>
          </div>
          <div class="month">{{ formatEventMonth(postData.eventDate) }}</div>
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

      <div class="like-count flex row justify-between items-center">


        <template v-if="postData.likes > 0">
          <span v-if="postData.likes === 1">
              <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 18px; padding-right: 8px;"/>
      {{ postData.likedBy[0] }} thinks this rocks
    </span>
          <span v-else>
              <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 18px; padding-right: 8px;"/>
      {{ postData.likedBy[0] }} and {{ postData.likes - 1 }} others think this rocks
    </span>
        </template>

      </div>
      <span><q-btn v-if="postData.comments && postData.comments.length > 0" flat
                   :label="!showComments ? `${postData.comments.length} Comments`: 'Hide Comments'"
                   @click="toggleCommentSection"/></span>

    </q-card-section>
    <q-separator color="white" v-if="!$route.path.includes('profile')" />
    <q-card-actions align="right" class="full-width flex row justify-center items-end"
                    v-if="!$route.path.includes('profile')">


      <div class="flex justify-center items-center" @click="handlePostLike(postData)">
        <q-btn
          flat
          outline
          label="Rock On"
          :color="isLiked(postData) ? 'positive' : ''">
          <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 18px; padding: 8px;"/>
        </q-btn>
      </div>

      <q-btn icon-right="chat" flat label="Comment" @click="toggleUserCommentSection"/>
      <q-btn icon-right="calendar_month" flat label="Save" :color="isSaved(postData)"
             @click="saveEventToCalendar(postData)"/>
      <q-btn icon-right="share" flat label="Share" @click="sharePost" class="copy-button"/>
    </q-card-actions>
    <div class="user-comment-section" v-if="showUserComment">
      <q-input
        style="flex: 6"

        dark
        v-model="userComment"
        label="Your Comment"

        @input="handleCommentInput"
      />

      <q-btn icon="send" flat outline @click="postComment(postData)" color="primary"/>
    </div>

    <!-- Comment Section -->
    <q-card-section v-if="showComments" class="comment-section">
      <!-- Render comments and replies using a new component -->
      <comment-section :comments="postData.comments" v-if="postData.comments"/>
    </q-card-section>
  </q-card>
</template>

<script>

import CommentSection from './CommentSection.vue';
import profileState from "src/mixins/profileState";
import {formatPostedDate, formatEventDayOfWeek, formatEventDayOfMonth, formatEventMonth} from 'src/utils/dateUtils'

export default {
  name: "UndergroundCard",
  components: {
    CommentSection,
  },
  mixins: [profileState],
  props: {
    postData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

      likeCount: this.postData.likes.length,
      showComments: false,
      showUserComment: false,
      userComment: "",

    };
  },
  computed: {},

  methods: {
    formatPostedDate, formatEventDayOfWeek, formatEventDayOfMonth, formatEventMonth,
    isLiked(postData) {
      return postData.likedBy ? postData.likedBy.includes(this.$store.state.auth.user.username) : false
    },
    isSaved(postData) {
      return this.interactions.find(event => event.concertId === postData.id) ? 'primary' : ''
    },
    handlePostLike(post) {
      console.log("Post liked:", post);
      this.$store.dispatch('underground/likePost', post)

    },
    saveEventToCalendar(post) {
      const action = this.isSaved(post) ? 'removed from' : 'added to'
      this.$q.notify({
        message: `Event ${action} calendar`,
        icon: 'calendar_month',
        label: 'Dismiss',
        color: 'orange',
         actions: [
          {
            label: 'View Calendar',
            color: 'yellow',
            handler: () => this.$router.push({ path: '/profile', query: { date: post.eventDate } })
          },
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => { /* ... */
            }
          }
        ]
      });
      if (this.isSaved(post)) {
        this.$store.dispatch('profile/removeUndergroundPostInteraction', post)
        return
      }
      // Implement logic to save the event to the user's calendar
      console.log("Event saved to calendar:", post);
      this.$store.dispatch('profile/saveUndergroundPostInteraction', post)
    },

    toggleUserCommentSection() {
      this.showUserComment = !this.showUserComment;
    },

    handleCommentInput(value) {
      this.userComment = value;
    },

    postComment(post) {
      // Implement logic to post the comment
      console.log("Comment posted:", this.userComment);
      // Clear the comment input and hide the user comment section
      this.$store.dispatch('underground/postComment', {post: post, comment: this.userComment})
      this.userComment = "";
      this.showUserComment = false;
      this.showComments = true;
    },


    toggleCommentSection() {
      this.showComments = !this.showComments;
    },
    sharePost() {
      const shareableLink = window.location.href;

      // Create a temporary textarea element to copy the link to the clipboard
      const textarea = document.createElement('textarea');
      textarea.value = shareableLink;
      document.body.appendChild(textarea);

      // Select and copy the link
      textarea.select();
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(textarea);

      // Notify the user
      this.$q.notify({
        message: 'Link Copied to Clipboard',
        icon: 'fas fa-share',
        position: 'top',
        timeout: 3000,
        actions: [{icon: 'close', color: 'white'}]
      });
    }

  },
};
</script>

<style scoped>

.event-date-rectangle {
  background-color: #3B3B3B;
  color: #fff;
  padding: 8px;
  border-radius: 0 5px 0 5px;
  font-size: 1em;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.day-of-week {
  font-size: 1.5em;
  font-weight: bold;
  margin-right: 5px;
}

.day-of-month {
  font-size: 1.25em;
}

.month {
  font-size: 1em;
}

.underground-card {
  background-color: #555555;
  color: #fff;
  margin-bottom: 20px;
}

.top-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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
}

.custom-button {
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #999999;
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
