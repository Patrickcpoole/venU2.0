export function setInterestedArtist(state, payload) {
  state.events.interested.push(payload)
}

export function removeInterestedArtist(state, payload) {
  console.log('remove payload', payload)
  let interested = state.events.interested
  if (interested.includes(payload)) {
    const index = interested.indexOf(payload)
    if (index > -1) { // only splice array when item is found
      console.log('item is found')
      interested.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

}

export function setGoingArtist(state, payload) {
  console.log('set going payload')
  state.events.going.push(payload)
}

export function removeGoingArtist(state, payload) {
  console.log('remove payload going', payload)
  let going = state.events.going
  if (going.includes(payload)) {
    const index = going.indexOf(payload)
    if (index > -1) { // only splice array when item is found
      console.log('item is found')
      going.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

}

