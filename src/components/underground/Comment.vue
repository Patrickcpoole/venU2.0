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
        <div class="flex row">
          <span style="font-weight: 600; margin-right: 5px;" v-if="getParentOwner(comment)">{{
              getParentOwner(comment)
            }}</span>
          <span style="font-size: 1.1em; ">{{ comment.text }}</span>
        </div>


      </div>
    </div>

    <div class="comment-bottom-content">
      <span style="font-size: .8em">{{ formatPostedDateComment(comment.createdAt) }}</span>
      <q-btn label="Rock On" size="sm" flat outline @click="handleLikeComment(comment)" padding="sm"/>
      <q-btn label="Reply" size="sm" flat outline @click="toggleCreateReply" padding="sm"/>
      <span v-if="this.comment.likes > 0" style="font-size: .8em">{{ this.comment.likes }} <font-awesome-icon
        :icon="['fas', 'guitar']" style="font-size: 14px; padding-left: 1px;"/></span>
    </div>
    <div class="flex justify-start">
      <q-btn :label="!showReplies ? 'View Replies' : 'Hide Replies'" flat outline dense
             icon="keyboard_return" style=" margin-left:55px;" v-if="comment.replies && comment.replies.length > 0"
             @click="showReplies= !showReplies"></q-btn>
    </div>
    <div class="user-reply-section" v-if="showUserReply">
      <q-input
        style="flex: 6"

        dark
        v-model="userReply"
        label="Your Reply"

        @input="handleReplyInput"
      />

      <q-btn icon="send" flat outline @click="postReply(comment)" color="primary"/>
    </div>
    <!-- Render replies using the same Comment component (recursive) -->
    <div class="q-ml-xl" v-if="comment.replies">
      <comment-section v-if="showReplies" :comments="comment.replies"/>
    </div>
  </div>
</template>

<script>
import CommentSection from './CommentSection.vue';
import {formatPostedDateComment} from 'src/utils/dateUtils'
import {undergroundState} from "src/mixins/undergroundState";

export default {
  name: 'Comment',
  mixins: [undergroundState],
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },


  data() {
    return {
      userReply: '',
      showReplies: false,
      showUserReply: false,
    };
  },
  components: {
    CommentSection,
  },
  methods: {
    formatPostedDateComment,
    handleReplyInput(value) {
      this.userReply = value;
    },
    toggleCreateReply() {
      this.showUserReply = !this.showUserReply;
    },
    handleLikeComment(comment) {
      console.log('Like comment', comment);
      this.$store.dispatch('underground/likeComment', comment)
    },
    postReply(comment) {
      console.log('Post reply', comment);
      this.$store.dispatch('underground/postReply', {comment, reply: this.userReply})
      this.userReply = '';
      this.showUserReply = false;
      this.showReplies = true;
    },
    getParentOwner(comment) {
      console.log('comment being passed', comment)
      const postId = comment.postCommentsId;
      const post = this.posts.find(post => {

        return post.id === postId
      })
      console.log('post', post)
      if (post) {
        const parentComment = post.comments.find(c => c.id === comment.commentRepliesId && c.parentId === null)
        console.log('parent comment', parentComment)
        if(!parentComment) return null;
        const replies = parentComment.replies.length ? [...parentComment.replies] : null;
        console.log('replies', replies)
        if (replies) {
          console.log('replies', replies)
          const parentReply = replies.find(r => r.id === comment.parentId) || null;
          if (!parentReply) return null;
          console.log('parent reply', parentReply)
          return `@${parentReply.userName}`
        }

      }

    },

  }
}
</script>

<style scoped>

.user-reply-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
  margin-top: 10px;
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
