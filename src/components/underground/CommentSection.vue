<!-- CommentSection.vue -->
<template>
  <div>
    <comment v-for="comment in comments" :key="comment.id" :comment="comment" @toggleCreateReply="toggleCreateReply" />
  </div>
</template>

<script>


export default {
  name: 'CommentSection',
  methods: {
    toggleCreateReply() {
      this.$emit('toggleCreateReply');
    },
  },
  props: ["comments"],
  components: {
    Comment: () => import('./Comment.vue'), // Use dynamic import for recursive components
  },
};
</script>
