import {API, graphqlOperation} from "aws-amplify";
import {createPost as createPostMutation} from "src/graphql/mutations";

export async function createPost({commit, rootState}, data) {
  const createPostRequest = {
    ...data,
    userName: rootState.auth.user.username,
    profilePicture: rootState.spotify.spotifyUserInfo.images[1].url,
    datePosted: new Date().toISOString(),
    likes: 0

  }
  console.log('creating post', createPostRequest)
  try {
    const postData = await API.graphql(graphqlOperation(createPostMutation, {input: createPostRequest}));
    console.log('post data', postData)
    commit("addPost", postData.data.createPost)
  } catch (err) {
    console.log('error creating post', err)
  }
}

export async function listPosts({commit}) {
  try {
    const postData = await API.graphql(graphqlOperation(listPosts));
    console.log('post data', postData)
    commit("setPosts", postData.data.listPosts.items)
  } catch (err) {
    console.log('error listing posts', err)
  }
}
