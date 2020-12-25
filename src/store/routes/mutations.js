export default {
  mutations: {
    saveRoute (state, routeObj) {
      // const wallRef = state.current_wall_ind !== 'i' ? state.current_wall_ind : 0
      state.routes[routeObj.id] = routeObj
    },
    deleteRoute (state, routeId) {
      /* const wallInd = state.walls.filter((w, i) => {
        return w.wall_id === wallId
      })

      state.walls.splice(wallInd, 1)
      */

      delete state.routes[routeId]
    },
    useRoutes (state, routes) {
      console.log('got route data ', routes)

      // for each route in routes ...
    }
  }
}
