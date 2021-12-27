/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVenue = /* GraphQL */ `
  subscription OnCreateVenue($owner: String) {
    onCreateVenue(owner: $owner) {
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
export const onUpdateVenue = /* GraphQL */ `
  subscription OnUpdateVenue($owner: String) {
    onUpdateVenue(owner: $owner) {
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
export const onDeleteVenue = /* GraphQL */ `
  subscription OnDeleteVenue($owner: String) {
    onDeleteVenue(owner: $owner) {
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
export const onCreateArtist = /* GraphQL */ `
  subscription OnCreateArtist($owner: String) {
    onCreateArtist(owner: $owner) {
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
export const onUpdateArtist = /* GraphQL */ `
  subscription OnUpdateArtist($owner: String) {
    onUpdateArtist(owner: $owner) {
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
export const onDeleteArtist = /* GraphQL */ `
  subscription OnDeleteArtist($owner: String) {
    onDeleteArtist(owner: $owner) {
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
