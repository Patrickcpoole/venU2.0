import {API, graphqlOperation, Storage} from "aws-amplify"
import {createVenue as createVenueMutation} from "src/graphql/mutations"
import {getVenue as getVenueQuery} from "src/graphql/queries"
import {listVenues as listVenuesQuery} from "src/graphql/queries";

export async function createVenue({dispatch}, newVenue) {
  try {
    await API.graphql(graphqlOperation(createVenueMutation, {input: newVenue}))
    dispatch("getVenuesData")
  } catch(error) {
    console.log("Create Venue Error", error)
  }
}

export async function getVenue(_, venueId){
  try {
  return await API.graphql(
    graphqlOperation(getVenueQuery, {id: venueId}))
      } catch(error) {
    console.log('Get Venue Error', error)
  }

}

export async function getVenuesData({commit}) {
  const venuesData = await API.graphql(graphqlOperation(listVenuesQuery));
  console.log('this is venues data', venuesData)
  commit("setVenues", venuesData.data.listVenues.items)
}
