import Vue from 'vue'
import Vuex from 'vuex'
// import ui from './ui/index'
import routes from './routes/index'
import gyms from './gyms/index'
import walls from './walls/index'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
let store = null
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    namespaced: true,
    modules: {
      // ui: ui,
      routes: routes,
      gyms: gyms,
      walls: walls
    },
    plugins: [
      createPersistedState()
    ],
    strict: process.env.DEV
  })

  store = Store
  return Store
}

export { store }
