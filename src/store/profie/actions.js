import {API, graphqlOperation, Storage} from "aws-amplify"

import {getArtist as getArtistQuery} from "src/graphql/queries"
import {listArtists as listArtistsQuery} from "src/graphql/queries";

export function saveInterestedArtist({commit}, data) {
  commit("setInterestedArtist", data)
}

export function removeInterestedArtist({commit}, data) {
  commit("removeInterestedArtist", data)
}

export function saveGoingArtist({commit}, data) {
  commit("setGoingArtist", data)
}

export function removeGoingArtist({commit}, data) {
  commit("removeGoingArtist", data)
}

