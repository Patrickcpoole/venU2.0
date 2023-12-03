/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVenue = /* GraphQL */ `
  query GetVenue($id: ID!) {
    getVenue(id: $id) {
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
export const listVenues = /* GraphQL */ `
  query ListVenues(
    $filter: ModelVenueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        capacity
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getConcert = /* GraphQL */ `
  query GetConcert($id: ID!) {
    getConcert(id: $id) {
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
export const listConcerts = /* GraphQL */ `
  query ListConcerts(
    $filter: ModelConcertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConcerts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        artistName
        openers
        date
        startTime
        image
        youtube
        createdAt
        updatedAt
        venueConcertsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        parentId
        postCommentsId
        commentRepliesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserShowInteraction = /* GraphQL */ `
  query GetUserShowInteraction($id: ID!) {
    getUserShowInteraction(id: $id) {
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
export const listUserShowInteractions = /* GraphQL */ `
  query ListUserShowInteractions(
    $filter: ModelUserShowInteractionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserShowInteractions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        concertId
        status
        createdAt
        updatedAt
        concertInteractionsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
