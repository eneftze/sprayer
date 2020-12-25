<template>

  <div id="route-view">

    <!--<div class="text-h4 text-center q-mt-md q-mb-lg">Add new route</div>-->

    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      :contracted="$q.screen.lt.sm"
    >

      <q-step
        :name="1"
        :title="$t('route_holds')"
        :caption="$t('route_holds_c')"
        icon="create"
        :done="step > 1"
      >

        <HoldsSelection
          v-on:set-hold="srh"
          v-on:route-has-holds="can_fill_form = false" />
      </q-step>

      <q-step
        :name="2"
        :title="$t('route_info')"
        caption="name, grade etc."
        icon="text_format"
        :done="step > 2"
      >

        <q-form style="height: calc(100vh - 208px)">

          <q-input
            v-model="route_name"
             class="q-mx-lg"
            label="Route name" />

          <q-select
            v-model="type_model"
            :options="type_options"
            label="Route type"
            class="q-mx-lg q-mt-lg"
            options-selected-class="text-deep-orange">

            <template v-slot:option="scope">

              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents">

                <q-item-section>

                  <q-item-label v-html="scope.opt.label" />

                  <q-item-label caption>{{ scope.opt.description }}</q-item-label>

                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <GradesDialog
            :grades="grades_to_show"
            v-on:set-grade="srg" />

          <q-input
            class="q-mx-lg q-mt-lg"
            v-model="route_author"
            placeholder="Anonymous"
            label="Author" />

          <q-input
            class="q-ma-lg"
            v-model="route_desc"
            filled
            type="textarea"
            label="Route description, comments and notes" />
        </q-form>
      </q-step>

      <template v-slot:navigation>

        <q-stepper-navigation
          class="q-mt-lg">

          <q-btn
            @click="addRoute(step)"
            no-caps
            color="primary"
            :disabled="can_fill_form"
            :label="step === 2 ? 'Add route' : 'Ok, I am ready'" />

          <!--<q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back to holds"
            class="q-ml-sm" />-->

          <q-btn
            @click="continueToGym"
            flat
            no-caps
            label="Cancel and browse" />

        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import GradesDialog from 'components/GradesDialog'
import HoldsSelection from 'components/HoldsSelection'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RouteView',
  components: { GradesDialog, HoldsSelection },
  data () {
    return {
      step: 1,
      can_fill_form: true,

      route_name: 'no name',
      route_walls: [],
      route_grade: '',
      route_author: '',
      route_holds: {},
      route_desc: '',

      grades_to_show: 'all_grades',
      type_model: null,
      type_options: [
        {
          label: 'Boulder Problem',
          value: 'boulder',
          description: 'Selected holds are all you can use for both hands and feet.'
        },
        {
          label: 'Hand restrictions only',
          value: 'route_hands',
          description: 'Use only the holds for hand restrictions and any feet holds on the wall'
        },
        {
          label: 'Feet restrictions only',
          value: 'route_legs',
          description: 'Use only the holds for feet restrictions and any hand holds on the wall'
        },
        {
          label: 'Route restricted',
          value: 'route_all',
          description: 'Selected holds are all you can use for both hands and feet.'
        }
      ]
    }
  },
  watch: {
    type_model (val) {
      this.grades_to_show = val.value === 'boulder' ? ['v_grade', 'fb'] : 'all_grades'
    }
  },
  methods: {
    ...mapActions([
      'saveRoute'
    ]),
    ...mapGetters([
      'getCurrentGymId'
    ]),
    // set sport grade for route
    srg (obj) {
      this.route_grade = obj.sport
    },
    // update route holds
    srh (obj) {
      this.route_holds = obj.holds
      this.route_walls = obj.walls
    },
    addRoute (step) {
      const routeData = {
        name: this.route_name,
        grade: this.route_grade,
        author: this.route_author,
        holds: this.route_holds,
        walls: this.route_walls,
        desc: this.route_desc
      }

      if (step < 2) {
        this.$refs.stepper.next()
      } else {
        // add new route
        this.verifyRouteData(routeData)
      }
    },
    continueToGym () {
      this.$router.go(-1)
    },
    async verifyRouteData (rD) {
      const hasHolds = rD.holds !== {}
      const hasWalls = rD.walls !== []
      const hasGrade = rD.grade !== ''

      let resultObj = { ...rD }
      let id = Date.now() + '_' + rD.name.replace(' ', '_').toLowerCase()

      if (hasHolds && hasWalls && hasGrade) {
        const gymId = this.getCurrentGymId()

        resultObj.id = id
        resultObj.gym = gymId

        await this.saveRoute({ routeData: resultObj, db: this.$db.localRoutes })
        this.$router.push({ path: '/gyms/' + gymId })
      }
    }
  }
}
</script>
