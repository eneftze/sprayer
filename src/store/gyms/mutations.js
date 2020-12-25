export default {
  mutations: {
    useInitGym (state) {
      state.current_gym_ind = 'i'
    },
    useGymWithId (state, gymId) {
      state.gyms.forEach(gymObj => {
        if (gymObj.gym_id === gymId) {
          state.current_gym_ind = state.gyms.indexOf(gymObj)
        }
      })
    },
    saveGyms (state, gyms) {
      state.gyms = gyms
      console.log('got new gyms ', state.gyms)
    },
    setCurrentGym (state, gymId) {
      state.current_gym_id = gymId
    }
  }
}
