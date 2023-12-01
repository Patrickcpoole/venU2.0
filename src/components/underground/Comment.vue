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
      <span style="font-size: .8em">{{ formatPostedDateComment(comment.createdAt) }}</span>
      <q-btn label="Rock On" size="sm" flat outline @click="handleLikeComment(comment)" padding="sm"/>
      <q-btn label="Reply" size="sm" flat outline @click="toggleReplySection" padding="sm"/>
          <span v-if="this.comment.likes > 0" style="font-size: .8em">{{ this.comment.likes}} <font-awesome-icon :icon="['fas', 'guitar']" style="font-size: 14px; padding-left: 1px;"/></span>
    </div>
    <div class="flex justify-start">
      <q-btn @click="toggleReplySection" :label="!showReplies ? 'View Replies' : 'Hide Replies'" flat outline dense
             icon="keyboard_return" style=" margin-left:55px;" v-if="comment.replies.length > 0"></q-btn>
    </div>
    <!-- Render replies using the same Comment component (recursive) -->
    <div class="q-ml-xl">
      <comment-section v-if="showReplies" :comments="comment.replies"/>
    </div>
  </div>
</template>

<script>
import CommentSection from './CommentSection.vue';
import {formatPostedDateComment} from 'src/utils/dateUtils'

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
    formatPostedDateComment,
    toggleReplySection() {
      this.showReplies = !this.showReplies;
    },
    handleLikeComment(comment) {
      console.log('Like comment', comment);
      this.$store.dispatch('underground/likeComment', comment)
    },
  },
};
</script>

<style scoped>
.like-count {

}

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
  margin-left: 55px;
}


</style>
