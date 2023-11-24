export function getVenues(state) {
  return state.venues
}

export function getAlphabeticVenues(state) {
  const sortedVenues = [...state.venues].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  return sortedVenues

}

export function getCapacityVenues(state) {
  const sortedVenues = [...state.venues].sort(function(a, b) {
  return b.capacity - a.capacity;
});
  return sortedVenues

}

export function getSelectedVenue(state) {
  return state.selectedVenue
}
