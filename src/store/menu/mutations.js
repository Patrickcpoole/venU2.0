export function TOGGLE_LEFT_MENU(state) {
  state.left.visible = !state.left.visible
}

export function TOGGLE_RIGHT_MENU(state) {
  state.right.visible = !state.right.visible
}

export function SET_RIGHT_MENU_ARTIST(state, payload) {
  state.right.artist = payload
}

