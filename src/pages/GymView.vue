<template>
  <div>

    <h2 class="text-center q-mt-md q-mb-lg">
      {{ name }}
    </h2>

    <q-tabs
      v-model="tab"
      inline-label
      align="center"
      no-caps
      class="text-black shadow-0">

      <q-tab name="info" label="Info" />
      <q-tab name="walls" label="Walls" />
      <q-tab name="routes" label="Routes" />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      class="transparent full-width">

      <q-tab-panel name="info">

        <div
          v-if="images"
          class="row">

          <div
            v-for="image in images"
            :key="image.data"
            class="col-4">

            <q-img
              :src="image"></q-img>
          </div>
        </div>

        <div
          class="row q-my-lg"
          v-if="info_data !== ''">

          <div class="col-12 text-body1">
            {{ info_data }}
          </div>
        </div>

        <div
          class="row q-my-md text-body2"
          v-if="open_time !== '' || close_time !== ''">

          <div class="col-12">

            <div v-if="open_time !== ''">
              Opens at {{ open_time }}
            </div>
            <div v-if="close_time !== ''">
              Closes at {{ close_time }}
            </div>
          </div>
        </div>

        <div
          class="row"
          v-if="location_lat !== '' && location_long !== ''">

          <div class="col-12">

            <div class="row">

              <div class="col-2 text-center">

                <q-icon name="explore" size="lg"></q-icon>
              </div>

              <div class="col-10 text-body2">
                {{ location_lat }}<br />{{ location_long }}
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="walls">

        <div class="row">
          <div
            v-for="wall in walls"
            :key="wall.wall_id"
            class="col-xs-12 col-sm-4 col-md-4">

            <q-card
              flat
              class="no-border-radius">

              <q-img
                :src="wall.wall_bg">

                <div class="absolute-bottom">

                  <div class="text-h6">
                    {{wall.wall_name}}
                  </div>

                  <div class="text-subtitle2" v-if="wall.wall_info !== ''">
                    {{ wall.wall_info }}
                  </div>
                </div>
              </q-img>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="routes">

        <div class="row">

          <div class="text-h3">
            {{ $t('routes') }}
          </div>

          <q-page>

            <div class="col-xs-12 col-sm-4 col-md-4">
              route list here
            </div>

            <q-page-sticky
              position="bottom-right"
              :offset="[18, 18]">

              {{ $t('add_route') }}

              <q-btn
                rounded
                dense
                color="primary"
                size="lg"
                icon="add"
                @click="goToAddRoute(wall_ids)" />
            </q-page-sticky>
          </q-page>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'GymView',
  data () {
    return {
      tab: 'info',
      info_data: '',
      name: '',
      location_lat: '',
      location_long: '',
      open_time: '',
      close_time: '',
      images: [],
      wall_ids: [],
      walls: [],
      routes: []
    }
  },
  methods: {
    ...mapGetters([
      'getGyms',
      'getWalls',
      'getRoutes'
    ]),
    ...mapActions([
      'setWallsForGym',
      'setRoutesForWall',
      'setAllRoutesForGym'
    ]),
    ...mapMutations([
      'setCurrentGym'
    ]),
    getGymData (gymId) {
      const allGyms = this.getGyms()
      const currentGym = allGyms.filter(g => {
        return g.gym_id === gymId
      })

      return currentGym[0]
    },
    getImages (data) {
      let output = []
      for (let item in data) {
        output.push(data[item].data)
      }

      return output
    },
    wallsToArray () {
      const wallObjs = this.getWalls()
      let output = []

      for (let wallId in wallObjs) {
        output.push(wallObjs[wallId])
      }

      return output
    },
    goToAddRoute (idsArray) {
      this.$router.push({ path: '/route', query: { id: 'new', wall_ids: idsArray } })
    }
  },
  async created () {
    const gymId = this.$route.params.id
    const curr = await this.getGymData(gymId)

    this.setCurrentGym(gymId)

    await this.setWallsForGym({ gymWalls: curr.gym_walls, db: this.$db.localWalls })
    await this.setAllRoutesForGym({ gymId: gymId, db: this.$db.localRoutes })

    this.name = curr.gym_name
    this.info_data = curr.gym_desc
    this.location_lat = 'Latitude: ' + curr.gym_loc.split(', ')[0]
    this.location_long = 'Longtitude: ' + curr.gym_loc.split(', ')[1]
    this.open_time = curr.gym_open_time
    this.close_time = curr.gym_close_time
    this.images = this.getImages(curr.gym_images)
    this.walls = this.wallsToArray()
    this.routes = this.getRoutes()
    this.walls.forEach(wallObj => {
      this.wall_ids.push(wallObj.wall_id)
    })
  }
}
</script>
