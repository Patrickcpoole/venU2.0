import { gql } from 'graphql-tag';

export const LIST_POSTS_WITH_COMMENTS = gql`
  query ListPostsWithComments {
    listPosts {
      items {
        id
        userName
        profilePicture
        datePosted
        eventDate
        text
        photoUrl
        videoUrl
        ticketUrl
        likes
        likedBy
        comments {
          items {
            id
            text
            userId
            createdAt
            updatedAt
            userName
            profilePicture
            likes
            likedBy
            replies {
              items {
                id
                text
                userId
                createdAt
                updatedAt
                userName
                profilePicture
              }
            }
          }
        }
      }
    }
  }
`;
