export function setPosts(state, payload) {
  console.log('setting posts mutation', state, payload)
  state.postData.push(payload);
}
