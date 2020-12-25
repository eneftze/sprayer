export default {
  getters: {
    getUserName (state) {
      return state.user.username
    },
    getUserSettings (state) {
      return state.user.settings
    },
    isLoggedIn (state) {
      return state.is_user_logged_in
    }
  }
}
