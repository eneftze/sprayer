export default {
  actions: {
    setWallsForGym ({ commit }, { gymWalls, db }) {
      db.allDocs({
        include_docs: true,
        attachments: true,
        keys: gymWalls
      }).then(function (wallDocs) {
        commit('useWalls', wallDocs.rows)
      }).catch(function (err) {
        console.log('Could not get walls for the gym', err)
      })
    }
  }
}
