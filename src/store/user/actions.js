import PouchDB from 'pouchdb'
import sDialog from '../../components/SprayDialog.vue'
import { Dialog } from 'quasar'

const db = new PouchDB('http://anastas:123456NK@localhost:5984/end_users')

const showDialog = function (title, message, displaySecondButton) {
  Dialog.create({
    component: sDialog,

    // optional if you want to have access to
    // Router, Vuex store, and so on, in your
    // custom component:
    parent: this, // becomes child of this Vue node
    // ("this" points to your Vue component)
    // (prop was called "root" in < 1.1.0 and
    // still works, but recommending to switch
    // to the more appropriate "parent" name)

    // props forwarded to component
    // (everything except "component" and "parent" props above):
    message_title: title,
    message_body: message,
    display_second_button: displaySecondButton
  }).onOk(() => {
    console.log('OK')
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}

export default {
  actions: {
    logUserIn ({ commit }, data, cb) {
      db.get(data.user_name).then(function (usrDoc) {
        if (usrDoc.password === data.password) {
          commit('logUserIn', usrDoc)
        } else {
          showDialog('Wrong password', 'The password for user ' + data.user_name + ' is not matching our records.', false)
        }
      }).catch(function (err) {
        if (err.error === 'not_found') {
          showDialog('Wrong username', 'There is no such user in our records', false)
          console.log('Not Found Login Error: ', err.error)
        } else {
          showDialog('Login Error', err, false)
        }
      })
    },
    logUserOut ({ commit }) {
      commit('logUserOut')
    },
    signUserUp ({ commit }, data) {
      db.get(data.user_name).then(function () {
        showDialog('Username already exists', 'Username already in use. Please Choose a different one.', false)
      }).catch(function (err) {
        if (err.error === 'not_found') {
          data._id = data.user_name

          db.put(data).then(function () {
            commit('signUserUp', data)
          }).catch(function (error) {
            showDialog('User not created', error, false)
          })
        } else {
          showDialog('User not created', err, false)
        }
      })
    }
  }
}
