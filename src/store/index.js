import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

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
    getters,
    mutations,
    actions,
    state,
    strict: process.env.DEV
  })

  store = Store
  return Store
}

export { store }
