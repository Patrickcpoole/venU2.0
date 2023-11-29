import {API, graphqlOperation} from "aws-amplify";
import {deleteUserShowInteraction} from "src/graphql/mutations";

export async function createPost({commit, rootState}, data) {
  const createPostRequest = {
    ...data,
    userName: rootState.auth.user.username,
    profilePicture: rootState.spotify.spotifyUserInfo.images[1].url,
    datePosted: new Date(),

  }
  console.log('creating post', createPostRequest)
  // try {
  //   const postData = await API.graphql(graphqlOperation(createPost, {input: createPostRequest}));
  //   console.log('post data', postData)
  //   commit("setPosts", postData.data.createPost)
  // } catch (err) {
  //   console.log('error creating interaction', err)
  // }
}
