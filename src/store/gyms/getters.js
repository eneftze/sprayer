export default {
  getters: {
    getGymName (state) {
      if (state.current_gym_ind === 'i') {
        return ''
      } else {
        return state.gyms[state.current_gym_ind].gym_name
      }
    },
    getGymLoc (state) {
      if (state.current_gym_ind === 'i') {
        return ''
      } else {
        return state.gyms[state.current_gym_ind].gym_loc
      }
    },
    getGymDesc (state) {
      if (state.current_gym_ind === 'i') {
        return ''
      } else {
        return state.gyms[state.current_gym_ind].gym_desc
      }
    },
    getGymImages (state) {
      const gym = state.gyms[state.current_gym_ind]

      if (state.current_gym_ind === 'i') {
        return state.gyms[state.gyms.length - 1].gym_images
      } else {
        var all = []

        for (const [key, value] of Object.entries(gym.gym_images)) {
          const arr = value.data.split(',')
          const base64data = arr[1]
          const bs = atob(base64data)
          const buffer = new ArrayBuffer(bs.length)
          const ba = new Uint8Array(buffer)

          for (var i = 0; i < bs.length; i++) {
            ba[i] = bs.charCodeAt(i)
          }

          const f = new File([ba], key, { type: value.content_type })

          all.push(f)
        }

        return all
      }
    },
    getGymOpenTimes (state) {
      if (state.current_gym_ind === 'i') {
        return ''
      } else {
        return state.gyms[state.current_gym_ind].gym_open_time
      }
    },
    getGymCloseTimes (state) {
      if (state.current_gym_ind === 'i') {
        return ''
      } else {
        return state.gyms[state.current_gym_ind].gym_close_time
      }
    },
    getGymWalls (state) {
      if (state.current_gym_ind !== 'i') {
        const gymWalls = state.gyms[state.current_gym_ind].gym_walls || []

        return gymWalls
      } else {
        return []
      }
    },
    getGyms (state) {
      console.log('get gyms', state.gyms)
      return state.gyms
    },
    getCurrentGymId (state) {
      return state.current_gym_id
    }
  }
}
