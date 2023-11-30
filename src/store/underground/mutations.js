import Vue from 'vue';

export function addPost(state, payload) {
  console.log('setting posts mutation', state, payload)
  state.postData.push(payload);
}

export function setPosts(state, payload) {
  console.log('setting posts mutation', state, payload)
  state.postData = payload
}

export function updatePost(state, payload) {
  console.log('updating post mutation', state, payload)
  const index = state.postData.findIndex((post) => post.id === payload.id);
  Vue.set(state.postData, index, payload);
}

export function createComment(state, payload) {
  const postId = payload.postCommentsId;
  const index = state.postData.findIndex((post) => post.id === postId);
  const post = state.postData[index];

  post.comments.items.push(payload)

  Vue.set(state.postData, index, post);
}
