import {API, graphqlOperation, Storage} from "aws-amplify"

import {getArtist as getArtistQuery} from "src/graphql/queries"
import {listArtists as listArtistsQuery} from "src/graphql/queries";

export function postVenueArtists({commit}, data) {
  console.log('post venue artists data', data)
  commit("setArtists", data)
}

export async function getArtist(_, venueId){
  console.log('this is the venue id', venueId)
  try {
  const artist =  await API.graphql(
    graphqlOperation(getArtistQuery, {id: venueId}))
    console.log('this is the artist', artist)
      } catch(error) {
    console.log('Get Venue Error', error)
  }



}

export async function getArtistsData({commit}) {
  const artistsData = await API.graphql(graphqlOperation(listArtistsQuery, {limit: 500}));
  console.log('this is artists data', artistsData)
  commit("setArtists", artistsData.data.listArtists.items)
}
