export default {
  mutations: {
    saveWall (state, wallObj) {
      // const wallRef = state.current_wall_ind !== 'i' ? state.current_wall_ind : 0
      state.walls[wallObj.wall_id] = wallObj
    },
    deleteWall (state, wallId) {
      /* const wallInd = state.walls.filter((w, i) => {
        return w.wall_id === wallId
      })

      state.walls.splice(wallInd, 1)
      */

      delete state.walls[wallId]
    },
    useWalls (state, walls) {
      for (let wall in walls) {
        state.walls[walls[wall].id] = walls[wall].doc
      }
    }
  }
}
