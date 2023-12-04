export function setVenues(state, payload){
  state.venues = payload
}

export function setSelectedVenue(state, payload) {
  state.selectedVenue = payload
}

export function clearVenuesState(state) {
  state.venues = []
  state.selectedVenue = {}
}
