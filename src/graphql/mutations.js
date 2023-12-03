/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVenue = /* GraphQL */ `
  mutation CreateVenue(
    $input: CreateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    createVenue(input: $input, condition: $condition) {
      id
      name
      location
      capacity
      image
      concerts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateVenue = /* GraphQL */ `
  mutation UpdateVenue(
    $input: UpdateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    updateVenue(input: $input, condition: $condition) {
      id
      name
      location
      capacity
      image
      concerts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteVenue = /* GraphQL */ `
  mutation DeleteVenue(
    $input: DeleteVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    deleteVenue(input: $input, condition: $condition) {
      id
      name
      location
      capacity
      image
      concerts {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createConcert = /* GraphQL */ `
  mutation CreateConcert(
    $input: CreateConcertInput!
    $condition: ModelConcertConditionInput
  ) {
    createConcert(input: $input, condition: $condition) {
      id
      artistName
      openers
      date
      startTime
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      __typename
    }
  }
`;
export const updateConcert = /* GraphQL */ `
  mutation UpdateConcert(
    $input: UpdateConcertInput!
    $condition: ModelConcertConditionInput
  ) {
    updateConcert(input: $input, condition: $condition) {
      id
      artistName
      openers
      date
      startTime
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      __typename
    }
  }
`;
export const deleteConcert = /* GraphQL */ `
  mutation DeleteConcert(
    $input: DeleteConcertInput!
    $condition: ModelConcertConditionInput
  ) {
    deleteConcert(input: $input, condition: $condition) {
      id
      artistName
      openers
      date
      startTime
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      __typename
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      __typename
    }
  }
`;
export const createUserShowInteraction = /* GraphQL */ `
  mutation CreateUserShowInteraction(
    $input: CreateUserShowInteractionInput!
    $condition: ModelUserShowInteractionConditionInput
  ) {
    createUserShowInteraction(input: $input, condition: $condition) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      __typename
    }
  }
`;
export const updateUserShowInteraction = /* GraphQL */ `
  mutation UpdateUserShowInteraction(
    $input: UpdateUserShowInteractionInput!
    $condition: ModelUserShowInteractionConditionInput
  ) {
    updateUserShowInteraction(input: $input, condition: $condition) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      __typename
    }
  }
`;
export const deleteUserShowInteraction = /* GraphQL */ `
  mutation DeleteUserShowInteraction(
    $input: DeleteUserShowInteractionInput!
    $condition: ModelUserShowInteractionConditionInput
  ) {
    deleteUserShowInteraction(input: $input, condition: $condition) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      __typename
    }
  }
`;
