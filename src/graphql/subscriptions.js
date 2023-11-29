/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVenue = /* GraphQL */ `
  subscription OnCreateVenue(
    $filter: ModelSubscriptionVenueFilterInput
    $owner: String
  ) {
    onCreateVenue(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onUpdateVenue = /* GraphQL */ `
  subscription OnUpdateVenue(
    $filter: ModelSubscriptionVenueFilterInput
    $owner: String
  ) {
    onUpdateVenue(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onDeleteVenue = /* GraphQL */ `
  subscription OnDeleteVenue(
    $filter: ModelSubscriptionVenueFilterInput
    $owner: String
  ) {
    onDeleteVenue(filter: $filter, owner: $owner) {
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
      owner
      __typename
    }
  }
`;
export const onCreateConcert = /* GraphQL */ `
  subscription OnCreateConcert(
    $filter: ModelSubscriptionConcertFilterInput
    $owner: String
  ) {
    onCreateConcert(filter: $filter, owner: $owner) {
      id
      artistName
      openers
      date
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      owner
      __typename
    }
  }
`;
export const onUpdateConcert = /* GraphQL */ `
  subscription OnUpdateConcert(
    $filter: ModelSubscriptionConcertFilterInput
    $owner: String
  ) {
    onUpdateConcert(filter: $filter, owner: $owner) {
      id
      artistName
      openers
      date
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      owner
      __typename
    }
  }
`;
export const onDeleteConcert = /* GraphQL */ `
  subscription OnDeleteConcert(
    $filter: ModelSubscriptionConcertFilterInput
    $owner: String
  ) {
    onDeleteConcert(filter: $filter, owner: $owner) {
      id
      artistName
      openers
      date
      image
      youtube
      interactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      venueConcertsId
      owner
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
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
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
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
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
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
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      text
      userId
      createdAt
      updatedAt
      userName
      profilePicture
      replies {
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      owner
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      text
      userId
      createdAt
      updatedAt
      userName
      profilePicture
      replies {
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      owner
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      text
      userId
      createdAt
      updatedAt
      userName
      profilePicture
      replies {
        nextToken
        __typename
      }
      parentId
      postCommentsId
      commentRepliesId
      owner
      __typename
    }
  }
`;
export const onCreateUserShowInteraction = /* GraphQL */ `
  subscription OnCreateUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
    $owner: String
  ) {
    onCreateUserShowInteraction(filter: $filter, owner: $owner) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      owner
      __typename
    }
  }
`;
export const onUpdateUserShowInteraction = /* GraphQL */ `
  subscription OnUpdateUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
    $owner: String
  ) {
    onUpdateUserShowInteraction(filter: $filter, owner: $owner) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      owner
      __typename
    }
  }
`;
export const onDeleteUserShowInteraction = /* GraphQL */ `
  subscription OnDeleteUserShowInteraction(
    $filter: ModelSubscriptionUserShowInteractionFilterInput
    $owner: String
  ) {
    onDeleteUserShowInteraction(filter: $filter, owner: $owner) {
      id
      userId
      concertId
      status
      createdAt
      updatedAt
      concertInteractionsId
      owner
      __typename
    }
  }
`;
