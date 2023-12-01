import Vue from 'vue';

export function addPost(state, payload) {
  console.log('setting posts mutation', state, payload)
  payload.comments = [];
  state.posts.push(payload);
}

export function setPosts(state, payload) {
  console.log('setting posts mutation', state, payload);

  state.posts = payload.map(post => {
    if (!post.comments || !post.comments.items) {
      return post; // Skip processing if comments or items are missing
    }

    const parentComments = post.comments.items.filter(comment => comment.commentRepliesId === null);
    console.log('parent comments', parentComments)

    const commentsWithReplies = parentComments.map(parentComment => {
      if (parentComment.replies.items.length) {
        console.log('Are we getting replies')
        const parentReplies = parentComment.replies.items.filter(reply => reply.parentId === parentComment.id)
        const childReplies = parentComment.replies.items.filter(reply => reply.parentId !== parentComment.id)
        console.log('parent replies', parentReplies)
        return {
          ...parentComment,
          replies: [...parentReplies, ...childReplies],
        };
      } else {
        return {
          ...parentComment,

        };
      }

    });

    return {
      ...post,
      comments: [...commentsWithReplies]
    };
  });
}


export function updatePost(state, payload) {
  console.log('updating post mutation', state, payload)
  const index = state.posts.findIndex((post) => post.id === payload.id);
  Vue.set(state.posts, index, payload);
}

export function createComment(state, payload) {
  const postId = payload.postCommentsId;
  const index = state.posts.findIndex((post) => post.id === postId);
  const post = state.posts[index];
  payload.replies = [];
  post.comments.push(payload)

  Vue.set(state.posts, index, post);
}

export function createReply(state, payload) {
  console.log('creating reply mutation', state, payload);

  const postId = payload.comment.postCommentsId;
  const index = state.posts.findIndex((post) => post.id === postId);
  const post = state.posts[index];
  let commentIndex
  if (payload.comment.commentRepliesId === null) {
    commentIndex = post.comments.findIndex((comment) => comment.id === payload.comment.id);
  } else {
    commentIndex = post.comments.findIndex((comment) => comment.id === payload.comment.commentRepliesId);
  }
  const comment = post.comments[commentIndex];

  // Initialize the replies array if it doesn't exist
  if (!comment.replies) {
    Vue.set(comment, 'replies', []);
  }

  // Create a new array with the updated replies
  const updatedReplies = [...comment.replies, payload.reply];

  // Update the 'replies' property of the comment
  Vue.set(comment, 'replies', updatedReplies);

  // Update the state with the modified post
  Vue.set(state.posts, index, post);
}


export function updateComment(state, payload) {
  console.log('updating comment mutation', state, payload)
  const postId = payload.postCommentsId;
  const index = state.posts.findIndex((post) => post.id === postId);
  const post = state.posts[index];

  const commentIndex = post.comments.findIndex((comment) => comment.id === payload.id);

  if (commentIndex === -1) {
    const parentCommentIndex = post.comments.findIndex((comment) => comment.id === payload.commentRepliesId);
    const parentComment = post.comments[parentCommentIndex];
    const replyIndex = parentComment.replies.findIndex((reply) => reply.id === payload.id);
    Vue.delete(payload, 'replies');


    console.log('payload in reply', payload)
    Vue.set(parentComment.replies, replyIndex, payload);

  } else {
    // Create a new array with the updated comment
    const updatedComments = [...post.comments];
    updatedComments[commentIndex] = payload;

    // Update the 'comments' property with the new array
    Vue.set(post, 'comments', updatedComments);

    // Update the state with the modified post
    Vue.set(state.posts, index, post);
  }


}

export function clearUndergroundState(state) {
  state.posts = [];
}
