export function undergroundEvents(state) {
  return state.events.underground
}

export function goingEvents(state) {
  return state.events.going
}

export function interestedEvents(state) {
  return state.events.interested
}

export function allEvents(state) {
  return [...state.events.interested, ...state.events.going, ...state.events.underground]
}

export function interactions(state) {
  return state.interactions
}


