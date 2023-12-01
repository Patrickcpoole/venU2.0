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
                owner
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
                        owner
                        parentId
                        profilePicture
                        likes
                        likedBy
                        commentRepliesId
                        postCommentsId
                        replies {
                            items {
                                id
                                text
                                userId
                                createdAt
                                updatedAt
                                userName
                                owner
                                parentId
                                profilePicture
                                likes
                                likedBy
                                commentRepliesId
                                postCommentsId
                            }
                        }
                    }
                }
            }
        }
    }
`;


