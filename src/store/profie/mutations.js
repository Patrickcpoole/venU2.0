export function setInteractions(state, payload) {
  state.interactions = payload;
}

export function setAllEvents(state, payload) {
  state.events.allEvents = payload;
}
export function setInterestedConcerts(state, payload) {
  state.events.interested = payload
}
export function setGoingConcerts(state, payload) {
  state.events.going = payload;
}
export function setUndergroundPosts(state, payload) {
  state.events.underground = payload;
}
export function saveInteraction(state, payload) {
  state.interactions.push(payload);
}
export function saveUndergroundPost(state, payload) {
  state.events.allEvents.push(payload);
  state.events.underground.push(payload);
}
export function saveConcert(state, {status, payload}) {
  state.events.allEvents.push(payload);
  console.log('creating interaction mutation', state.events, status, payload)
  state.events[status].push(payload);
}
export function removeInteraction(state, payload) {
  removeItemFromList(state.interactions, payload);
}
export function removeConcert(state, {status, payload}) {
  removeItemFromList(state.events[status], payload);
  removeItemFromList(state.events['allEvents'], payload);
}
export function removeUndergroundPost(state, payload) {
  removeItemFromList(state.events.underground, payload);
  removeItemFromList(state.events['allEvents'], payload);
}
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

