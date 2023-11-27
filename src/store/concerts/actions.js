import {API, graphqlOperation, Storage} from "aws-amplify"

import {getConcert as getConcertQuery} from "src/graphql/queries"
import {listConcerts as listConcertsQuery} from "src/graphql/queries";

export function postVenueConcerts({commit}, data) {
  console.log('post venue concerts data', data)
  commit("setConcerts", data)
}

export async function getConcert(_, venueId){
  console.log('this is the venue id', venueId)
  try {
  const concert =  await API.graphql(
    graphqlOperation(getConcertQuery, {id: venueId}))
    console.log('this is the concert', concert)
      } catch(error) {
    console.log('Get Venue Error', error)
  }



}

export async function getConcertsData({commit}) {
  const concertsData = await API.graphql(graphqlOperation(listConcertsQuery, {limit: 500}));
  console.log('this is concerts data', concertsData)
  commit("setConcerts", concertsData.data.listConcerts.items)
}
