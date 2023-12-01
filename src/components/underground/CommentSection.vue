<!-- CommentSection.vue -->
<template>
  <div>
    <comment v-for="comment in comments" :key="comment.id" :comment="comment"/>
  </div>
</template>

<script>
import Comment from './Comment.vue';

export default {
  name: 'CommentSection',

  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  components: {
    Comment,
  },
};
</script>
