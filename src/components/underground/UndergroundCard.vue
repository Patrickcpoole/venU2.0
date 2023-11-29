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
import {date} from 'quasar'

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
    formatEventDate(eventDate) {
      // Use Quasar's date utility to format the event date
      return date.formatDate(new Date(eventDate), 'ddd DD MMM');
    },

    formatEventDayOfWeek(eventDate) {
      // Extract and format the day of the week
      return date.formatDate(new Date(eventDate), 'ddd');
    },

    formatEventDayOfMonth(eventDate) {
      // Extract and format the day of the month
      return date.formatDate(new Date(eventDate), 'Do');
    },

    formatEventMonth(eventDate) {
      // Extract and format the month
      return date.formatDate(new Date(eventDate), 'MMMM');
    },
    formatPostedDate(timeStamp) {
      const date1 = new Date();
      const date2 = new Date(timeStamp);

      const timeDiffInMilliseconds = date1 - date2;

      const minuteThreshold = 60 * 1000; // 1 minute in milliseconds
      const hourThreshold = 60 * minuteThreshold; // 1 hour in milliseconds
      const dayThreshold = 24 * hourThreshold; // 1 day in milliseconds
      console.log('hourThreshold', hourThreshold)
      let unit;
      if (timeDiffInMilliseconds < minuteThreshold) {
        unit = 'seconds';
      } else if (timeDiffInMilliseconds < hourThreshold) {
        unit = 'minutes';
      } else if (timeDiffInMilliseconds < dayThreshold) {
        unit = 'hours';
      } else {
        unit = 'days'
      }

      const diff = date.getDateDiff(date1, date2, unit);

      return diff === 1 ? diff + ' ' + unit.slice(0, -1) + ' ago' : diff + ' ' + unit + ' ago';
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

.event-date-rectangle {
  background-color: $primary; // Example color, you can adjust it as needed
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
    font-size: 1.2em; // Adjust the font size as needed
    font-weight: bold;
  margin-right: 5px;
  }

  .day-of-month {
    font-size: 1.5em; // Adjust the font size as needed
  }

  .month {
    font-size: 1em; // Adjust the font size as needed
  }

.underground-card {
  background-color: #555555;
  color: #fff;
  margin-bottom: 2.5%;
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
