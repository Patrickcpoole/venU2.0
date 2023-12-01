export function toggleRightMenu(context, data) {
  context.commit('setRightMenuConcert', data)
  context.commit('toggleRightMenu')
}

export function toggleLeftMenu(context, data) {
  console.log('toggleLeftMenu action')
  context.commit('toggleLeftMenu')
}

export function closeRightMenu(context) {
  context.commit('closeRightMenu')
}

