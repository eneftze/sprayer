export default {
  actions: {
    getAllGyms ({ commit }, { lat, lng, db }) {
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (docs) {
        const filtered = Array.from(docs.rows).filter((gym) => {
          const gymLat = parseFloat(gym.doc.gym_loc.split(',')[0])
          const gymLong = parseFloat(gym.doc.gym_loc.split(', ')[1])

          return ((lat - gymLat) <= 20 && (lat - gymLat) >= -20) && ((lng - gymLong) <= 20 && (lng - gymLong) >= -20)
        })

        const filteredArray = filtered.map(gymR => gymR.doc)
        console.log('all gyms ', docs, filtered, filteredArray)

        commit('saveGyms', filteredArray)
      }).catch(function (err) {
        console.log('Could not get all gyms', err)
      })
    }
  }
}
