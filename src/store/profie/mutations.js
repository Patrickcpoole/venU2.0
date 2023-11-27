export function setInterestedConcerts(state, payload) {
  state.events.interested = payload
}

export function setGoingConcerts(state, payload) {
  state.events.going = payload;
}

export function createConcertInteraction(state, { status, payload }) {
  console.log('creating interaction mutation', state.events, status, payload)
  state.events[status].push(payload);
}

export function removeConcertInteraction(state, { status, payload }) {
  removeItemFromList(state.events[status], payload);
}

// export function removeInterestedConcert(state, payload) {
//   removeItemFromList(state.events.interested, payload);
// }

function removeItemFromList(list, payload) {
  const index = list.findIndex((item) => item.id === payload.id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

export function clearProfileState(state) {
  state.events = {
    going: [],
    interested: []
  }
}

