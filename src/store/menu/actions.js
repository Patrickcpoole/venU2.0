export function toggleRightMenu(context, data) {
  context.commit('SET_RIGHT_MENU_ARTIST', data)
  context.commit('TOGGLE_RIGHT_MENU')
}

