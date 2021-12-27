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
      artists {
        items {
          id
          name
          openers
          date
          image
          createdAt
          updatedAt
          venueArtistsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
        artists {
          items {
            id
            name
            openers
            date
            image
            createdAt
            updatedAt
            venueArtistsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getArtist = /* GraphQL */ `
  query GetArtist($id: ID!) {
    getArtist(id: $id) {
      id
      name
      openers
      date
      image
      createdAt
      updatedAt
      venueArtistsId
      owner
    }
  }
`;
export const listArtists = /* GraphQL */ `
  query ListArtists(
    $filter: ModelArtistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArtists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        openers
        date
        image
        createdAt
        updatedAt
        venueArtistsId
        owner
      }
      nextToken
    }
  }
`;
