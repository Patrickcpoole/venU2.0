import Vue from 'vue';

export function addPost(state, payload) {
  console.log('setting posts mutation', state, payload)
  payload.comments = [];
  state.posts.push(payload);
}

export function setPosts(state, payload) {
  console.log('setting posts mutation', state, payload);

  state.posts = payload.map(post => {
    const commentsItems = post.comments.items
    return {
      ...post,
      comments: commentsItems,
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

  post.comments.push(payload)

  Vue.set(state.posts, index, post);
}

export function updateComment(state, payload) {
  const postId = payload.postCommentsId;
  const index = state.posts.findIndex((post) => post.id === postId);
  const post = state.posts[index];

  const commentIndex = post.comments.findIndex((comment) => comment.id === payload.id);

  // Create a new array with the updated comment
  const updatedComments = [...post.comments];
  updatedComments[commentIndex] = payload;

  // Update the 'comments' property with the new array
  Vue.set(post, 'comments', updatedComments);

  // Update the state with the modified post
  Vue.set(state.posts, index, post);
}

export function clearUndergroundState(state) {
  state.posts = [];
}
