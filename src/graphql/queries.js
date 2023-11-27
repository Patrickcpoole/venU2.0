/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      owner
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
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
      owner
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
        owner
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
        image
        youtube
        createdAt
        updatedAt
        venueConcertsId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
