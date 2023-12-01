import {API, graphqlOperation} from "aws-amplify";
import { LIST_POSTS_WITH_COMMENTS } from 'src/graphql/customQueries';
import {
  createPost as createPostMutation,
  createComment as createCommentMutation,
  updatePost as updatePostMutation,
  updateComment as updateCommentMutation,

} from "src/graphql/mutations";
import {getComment as getCommentQuery} from "src/graphql/queries";
import {listPosts as listPostsQuery} from "src/graphql/queries";

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
    const postData = await API.graphql(graphqlOperation(LIST_POSTS_WITH_COMMENTS));
    console.log('post data', postData)
    commit("setPosts", postData.data.listPosts.items)
  } catch (err) {
    console.log('error listing posts', err)
  }
}

export async function likeComment({commit, rootState}, data) {
  console.log('liking comment', data)
  const username = rootState.auth.user.username;
  let likeCommentRequest;
  const replies = data.replies
  // Check if likedBy is present on the post data, provide a default value of an empty array if not
  const currentLikedBy = data.likedBy || [];

  if (currentLikedBy.includes(username)) {
    likeCommentRequest = {

      id: data.id,
      likes: data.likes - 1,
      likedBy: currentLikedBy.filter((user) => user !== username),
    };
  } else {
    likeCommentRequest = {

      id: data.id,
      likes: data.likes ? data.likes + 1 : 1,
      likedBy: [...currentLikedBy, username],
    };
  }

  try {
    const commentData = await API.graphql(graphqlOperation(updateCommentMutation, { input: likeCommentRequest }));
    console.log('liked comment data', commentData);
    let payload = commentData.data.updateComment
    if(data.replies){
      payload = {
        ...commentData.data.updateComment,
        replies: replies
      }
    }
    commit('updateComment', payload);
  } catch (err) {
    console.log('error liking comment', err);
  }
}

export async function likePost({ commit, rootState }, data) {
  const username = rootState.auth.user.username;
  let likePostRequest;

  // Check if likedBy is present on the post data, provide a default value of an empty array if not
  const currentLikedBy = data.likedBy || [];

  if (currentLikedBy.includes(username)) {
    likePostRequest = {
      id: data.id,
      likes: data.likes - 1,
      likedBy: currentLikedBy.filter((user) => user !== username),
    };
  } else {
    likePostRequest = {
      id: data.id,
      likes: data.likes + 1,
      likedBy: [...currentLikedBy, username],
    };
  }
  console.log('liking post', likePostRequest);
  try {
    const postData = await API.graphql(graphqlOperation(updatePostMutation, { input: likePostRequest }));
    console.log('post data', postData);
    commit('updatePost', postData.data.updatePost);
  } catch (err) {
    console.log('error liking post', err);
  }
}

export async function postComment({commit, rootState}, data) {
  const {post, comment} = data
  const commentPostRequest = {
    postCommentsId: post.id,
    text: comment,
    userId: rootState.auth.user.id,
    userName: rootState.auth.user.username,
    profilePicture: rootState.spotify.spotifyUserInfo.images[1].url,
    likes: 0,
  }
  console.log('commenting post', commentPostRequest)
  try {
    const commentData = await API.graphql(graphqlOperation(createCommentMutation, {input: commentPostRequest}));
    console.log('comment data', commentData)
    commit('createComment', commentData.data.createComment)
  } catch (err) {
    console.log('error commenting post', err)
  }
}

export async function postReply({ commit, rootState }, data) {
  const { comment, reply } = data;
  const replyCommentRequest = {
    postCommentsId: comment.postCommentsId,
    commentRepliesId: comment.commentRepliesId !== null ? comment.commentRepliesId : comment.id,
    parentId: comment.id,
    text: reply,
    userId: rootState.auth.user.id,
    userName: rootState.auth.user.username,
    profilePicture: rootState.spotify.spotifyUserInfo.images[1].url,
    likes: 0,
  };
  console.log('replying comment', replyCommentRequest);

  try {
    const replyData = await API.graphql(graphqlOperation(createCommentMutation, { input: replyCommentRequest }));
    console.log('reply data', replyData);

    const payload = {
      reply: replyData.data.createComment,
      comment: comment,
    };
    commit('createReply', payload);
  } catch (err) {
    console.log('error replying comment', err);
  }
}

export async function getCommentByID(state, id) {
  try {
    const comment = await API.graphql(graphqlOperation(getCommentQuery, { id: id }));
    console.log('comment by id', comment)
    return comment.data.getComment



  } catch (err) {
    console.log('error getting comment', err);
  }

}

