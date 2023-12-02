import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import venues from './venues'
import concerts from './concerts'
import profile from './profie'
import spotify from './spotify'
import menu from './menu'
import underground from './underground'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      venues,
      concerts,
      profile,
      spotify,
      menu,
      underground
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
    plugins: [],
  })

  return Store
}
