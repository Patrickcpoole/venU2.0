export function posts(state) {
  return state.posts
}

export function getCommentById(state) {
  return (comment) => {
    // Assuming comment has a property named postCommentsId
    const postId = comment.postCommentsId;

    // Find the post that contains the comment
    const post = state.posts.find(post => post.id === postId);

    // If the post is found, find the comment within the post
    if (post) {
      return post.comments.find(c => c.id === comment.id) || null;
    }

    return null;
  };
}
