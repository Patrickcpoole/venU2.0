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
      owner
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
      owner
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
      owner
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
      owner
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
      owner
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
      owner
      __typename
    }
  }
`;
