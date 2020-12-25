export default {
  mutations: {
    logUserIn (state, usrDoc) {
      state.user = {
        username: usrDoc.user_name,
        settings: usrDoc.settings
      }

      state.is_user_logged_in = true
    },
    signUserUp (state, data) {
      state.user = {
        username: data.user_name,
        password: data.password,
        settings: data.settings
      }
      state.is_user_logged_in = true
    },
    logUserOut (state) {
      state.is_user_logged_in = false
    },
    changeUserSettings (state, data) {
      state.user.settings = data
    },
    setErrorMessage (state, msg) {
      console.log(msg)
    }
  }
}
