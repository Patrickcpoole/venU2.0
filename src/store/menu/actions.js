export function toggleRightMenu(context, data) {
  context.commit('setRightMenuConcert', data)
  context.commit('toggleRightMenu')
}

export function toggleLeftMenu(context, data) {

  context.commit('toggleLeftMenu')
}

