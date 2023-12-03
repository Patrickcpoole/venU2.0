/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVenue = /* GraphQL */ `
  subscription OnCreateVenue($filter: ModelSubscriptionVenueFilterInput) {
    onCreateVenue(filter: $filter) {
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
export const onUpdateVenue = /* GraphQL */ `
  subscription OnUpdateVenue($filter: ModelSubscriptionVenueFilterInput) {
    onUpdateVenue(filter: $filter) {
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
export const onDeleteVenue = /* GraphQL */ `
  subscription OnDeleteVenue($filter: ModelSubscriptionVenueFilterInput) {
    onDeleteVenue(filter: $filter) {
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
export const onCreateConcert = /* GraphQL */ `
  subscription OnCreateConcert($filter: ModelSubscriptionConcertFilterInput) {
    onCreateConcert(filter: $filter) {
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
export const onUpdateConcert = /* GraphQL */ `
  subscription OnUpdateConcert($filter: ModelSubscriptionConcertFilterInput) {
    onUpdateConcert(filter: $filter) {
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
export const onDeleteConcert = /* GraphQL */ `
  subscription OnDeleteConcert($filter: ModelSubscriptionConcertFilterInput) {
    onDeleteConcert(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
export const onCreateUserShowInteraction = /* GraphQL */ `
  subscription OnCreateUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
  ) {
    onCreateUserShowInteraction(filter: $filter) {
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
export const onUpdateUserShowInteraction = /* GraphQL */ `
  subscription OnUpdateUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
  ) {
    onUpdateUserShowInteraction(filter: $filter) {
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
export const onDeleteUserShowInteraction = /* GraphQL */ `
  subscription OnDeleteUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
  ) {
    onDeleteUserShowInteraction(filter: $filter) {
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
