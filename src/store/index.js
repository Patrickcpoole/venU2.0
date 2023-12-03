import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
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

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

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
    plugins: [vuexLocalStorage.plugin]
  })

  return Store
}
