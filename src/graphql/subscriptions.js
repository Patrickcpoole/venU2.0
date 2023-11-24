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
      artists {
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
      artists {
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
      artists {
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
export const onCreateArtist = /* GraphQL */ `
  subscription OnCreateArtist(
    $filter: ModelSubscriptionArtistFilterInput
    $owner: String
  ) {
    onCreateArtist(filter: $filter, owner: $owner) {
      id
      name
      openers
      date
      image
      youtube
      createdAt
      updatedAt
      venueArtistsId
      owner
      __typename
    }
  }
`;
export const onUpdateArtist = /* GraphQL */ `
  subscription OnUpdateArtist(
    $filter: ModelSubscriptionArtistFilterInput
    $owner: String
  ) {
    onUpdateArtist(filter: $filter, owner: $owner) {
      id
      name
      openers
      date
      image
      youtube
      createdAt
      updatedAt
      venueArtistsId
      owner
      __typename
    }
  }
`;
export const onDeleteArtist = /* GraphQL */ `
  subscription OnDeleteArtist(
    $filter: ModelSubscriptionArtistFilterInput
    $owner: String
  ) {
    onDeleteArtist(filter: $filter, owner: $owner) {
      id
      name
      openers
      date
      image
      youtube
      createdAt
      updatedAt
      venueArtistsId
      owner
      __typename
    }
  }
`;
