export function toggleRightMenu(context, data) {
  context.commit('setRightMenuConcert', data)
  context.commit('toggleRightMenu')
}

