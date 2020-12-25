export default {
  actions: {
    /* setRoutesForWall ({ commit }, { gymWallId, dbRoutes }) {
      dbRoutes.allDocs({
        include_docs: true,
        attachments: true,
        keys: gymWallId
      }).then(function (routeDocs) {
        commit('useRoutes', routeDocs)
      }).catch(function (err) {
        console.log('Could not get routes for wall ' + gymWallId, err)
      })
    } */
    saveRoute ({ commit }, { routeData, db }) {
      console.log('about to save route ', routeData, db)
      routeData._id = routeData.id

      db.put(routeData).then(function (res) {
        console.log('DB PUT OK', res)
        commit('saveRoute', routeData)
      }).catch(function (err) {
        console.log('Could not save route ', err)
      })
    },
    setAllRoutesForGym ({ commit }, { gymId, db }) {
      db.allDocs({
        include_docs: true
      }).then(function (docs) {
        Array.from(docs.rows).forEach(r => {
          if (r.gym === gymId) {
            commit('saveRoute', r.doc)
          }
        })
      }).catch(function (err) {
        console.log('Could not get routes for gym ', gymId, err)
      })
    }
  }
}
