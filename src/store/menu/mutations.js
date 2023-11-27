export function toggleLeftMenu(state) {
  state.left.visible = !state.left.visible
}

export function toggleRightMenu(state) {
  state.right.visible = !state.right.visible
}

export function setRightMenuConcert(state, payload) {
  state.right.concert = payload
}

export function clearMenuState(state) {
  state.left.visible = false
  state.right.visible = false
  state.right.concert = {}
}

