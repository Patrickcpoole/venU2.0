<!-- Comment.vue -->
<template>
  <div class="comment">
    <!-- Render the comment -->
    <div class="flex">
      <q-avatar size="40px">
        <q-img :src="comment.profilePicture" height="40px" width="40px"></q-img>
      </q-avatar>
      <div class="comment-inner-content">
        <span style="font-size: 1em; font-weight: 600">{{ comment.userName }}</span>
        <span style="font-size: 1.1em">{{ comment.text }}</span>
      </div>
    </div>
    <div class="comment-bottom-content">
      <span style="font-size: .8em">{{ formatDate(comment.createdAt) }}</span>
      <q-btn label="Like" flat outline/>
      <q-btn label="Reply" flat outline @click="toggleReplySection"/>
    </div>
    <div class="flex justify-start">
    <q-btn @click="toggleReplySection" :label="!showReplies ? 'View Replies' : 'Hide Replies'" flat outline dense icon="keyboard_return" style=" margin-left:55px;" v-if="comment.replies.length > 0"></q-btn>
      </div>
    <!-- Render replies using the same Comment component (recursive) -->
    <div class="q-ml-xl">
    <comment-section v-if="showReplies" :comments="comment.replies"/>
      </div>
  </div>
</template>

<script>
import CommentSection from './CommentSection.vue';

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showReplies: false,
    };
  },
  components: {
    CommentSection,
  },
  methods: {
     formatDate(date) {
      // Implement a date formatting function if needed
      return date.toLocaleString();
    },
    toggleReplySection() {
      this.showReplies = !this.showReplies;
    },
  },
};
</script>

<style scoped>
.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
}

.comment-inner-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;

  border-radius: 5px;

  background-color: #555555;
}

.comment-bottom-content {
  margin-left:55px;
}

</style>
