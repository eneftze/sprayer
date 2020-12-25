<template>
  <div class="q-pa-lg">
    <h2>Gyms nearby</h2>

    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <q-card
          v-for="gym in gyms"
          :key="gym.gym_id">
          <router-link
            :to="'/gyms/' + gym.gym_id">
            <q-img :src="getPrimeImage(gym)">
              <div class="absolute-bottom">
                <div class="text-h6">
                  {{gym.gym_name}}
                </div>

                <div
                  v-if="gym.gym_open_time"
                  class="text-subtitle2">{{gym.gym_open_time}} - {{gym.gym_close_time}}</div>
              </div>
            </q-img>
          </router-link>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LocateView',
  data () {
    return {
      lat: null,
      lng: null,
      gyms: []
    }
  },

  methods: {
    ...mapGetters([
      'getGyms'
    ]),
    ...mapActions([
      'getAllGyms'
    ]),
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
      } else {
        alert('Geolocation is not supported by this browser.')
      }
    },

    geoSuccess (position) {
      console.log('lat:' + position.coords.latitude + ' lng:' + position.coords.longitude)
      this.showGyms(position.coords.latitude, position.coords.longitude)
    },

    geoError () {},

    async showGyms (lat, long) {
      await this.getAllGyms({ lat: lat, lng: long, db: this.$db.localGyms })
      const nearBy = this.getGyms()

      this.gyms = nearBy
    },

    getPrimeImage (gymData) {
      let datas = []

      for (var imgName in gymData.gym_images) {
        datas.push(gymData.gym_images[imgName].data)
      }

      return datas[0]
    }
  },
  mounted () {
    this.getLocation()
  }
}
</script>
