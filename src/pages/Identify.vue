<template>
  <q-page class="identify-page">
    <div class="column">
      <div class="col-8">
        <q-tabs
          v-model="tab"
          inline-label
          align="center"
          no-caps
          class="text-white shadow-0">
          <q-tab name="login" label="Log in" />
          <q-tab name="signup" label="Sign up" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="transparent full-width">
          <q-tab-panel name="login">
            <div class="row">
              <div class="col-xs-0 col-sm-3 col-md-4"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <h2 class="text-h3 q-mt-xl q-mb-xl">Log in</h2>
                <q-form
                  @reset="onLogInReset"
                  class="q-gutter-md"
                >
                  <q-input
                    outlined
                    square
                    clearable
                    v-model="username"
                    dark
                    label="Username"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>

                  <q-input
                    outlined
                    square
                    clearable
                    dark
                    type="password"
                    v-model="password"
                    label="Password"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' && val.length > 0 || 'Please type your password',
                      val => val.length > 0 && val.length > 6 || 'Incorrect password'
                    ]">
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                    </template>
                  </q-input>

                  <div class="row">
                    <div class="col-8">
                      <q-btn label="Log in" @click="onLogIn" unelevated square size="lg" color="positive" class="full-width no-border-radius"/>
                    </div>
                    <div class="col-4">
                      <q-btn label="Clear" type="reset" color="grey-4" size="lg" flat class="full-width" />
                    </div>
                  </div>
                </q-form>
              </div>
              <div class="col-xs-0 col-sm-3 col-md-4"></div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="signup">
            <div class="row">
              <div class="col-xs-0 col-sm-3 col-md-4"></div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <h2 class="text-h3 q-mt-xl q-mb-xl">Sign up</h2>
                <q-form
                  @submit="onSignUp"
                  @reset="onSignUpReset"
                  class="q-gutter-md"
                >
                  <q-input
                    outlined
                    square
                    clearable
                    dark
                    v-model="signup_username"
                    label="Desired username"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>

                  <q-input
                    outlined
                    square
                    clearable
                    dark
                    type="password"
                    v-model="signup_password"
                    label="Desired password"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' && val.length > 0 || 'Please type your password',
                      val => val.length > 0 && val.length > 6 || 'Incorrect password'
                    ]">
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                    </template>
                  </q-input>

                  <q-input
                    outlined
                    square
                    clearable
                    dark
                    type="password"
                    v-model="password_repeat"
                    label="Confirm password"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' && val.length > 0 || 'Please type your password',
                      val => val.length > 0 && val.length > 6 || 'Incorrect password'
                    ]">
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                    </template>
                  </q-input>

                  <q-toggle dark v-model="accept" label="I accept the license and terms" class="q-field--with-bottom"/>

                  <div class="row">
                    <div class="col-8">
                      <q-btn label="Sign up" unelevated square type="submit" size="lg" color="positive" class="full-width no-border-radius"/>
                    </div>
                    <div class="col-4">
                      <q-btn label="Clear" type="reset" color="grey-4" size="lg" flat class="full-width" />
                    </div>
                  </div>
                </q-form>
              </div>
              <div class="col-xs-0 col-sm-3 col-md-4"></div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-xs-0 col-sm-3 col-md-4"></div>
          <div class="col-xs-12 col-sm-6 col-md-4 q-px-md">
            <h2 class="q-mt-md text-h5">Or just</h2>
            <q-btn
              label="Countinue as guest"
              icon-right="chevron_right"
              size="lg"
              unelevated
              text-color="grey-4"
              color="grey-10"
              class="q-mt-sm q-mb-md full-width no-border-radius">
            </q-btn>
          </div>
          <div class="col-xs-0 col-sm-3 col-md-4"></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sDialog from '../components/SprayDialog.vue'

export default {
  name: 'PageIdentify',
  data () {
    return {
      username: null,
      password: null,
      signup_username: null,
      signup_password: null,
      password_repeat: null,
      tab: 'login',

      accept: false
    }
  },

  computed: {
    isIn () {
      return this.isLoggedIn()
    }
  },

  watch: {
    isIn (is) {
      is ? this.$router.push('/locate') : this.showDialog('Login failure', 'Could not log you in. Please try again')
    }
  },

  methods: {
    ...mapActions([
      'signUserUp',
      'logUserIn'
    ]),

    ...mapGetters([
      'isLoggedIn'
    ]),

    onSignUp () {
      if (this.accept !== true) {
        this.showDialog('License agreement not accepted', 'You should accept the terms and conditions before using the product.')
      } else if (this.signup_password !== this.password_repeat) {
        this.showDialog('Passwords mismatch', 'The password confirm is not the same as the desired password')
      } else {
        const data = {
          user_name: this.signup_username,
          password: this.signup_password
        }

        this.signUserUp(data)
        if (this.isLoggedIn()) {
          this.$router.push('/locate')
        }
      }
    },
    onLogIn () {
      this.logUserIn({
        user_name: this.username,
        password: this.password
      })
    },
    onSignUpReset () {
      this.signup_username = null
      this.signup_password = null
      this.password_repeat = null
      this.accept = false
    },
    onLogInReset () {
      this.username = null
      this.password = null
    },
    showDialog (title, message) {
      this.$q.dialog({
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
        display_second_button: false
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  }
}
</script>
