<template>
  <div style="height: calc(100vh - 208px)">

    <div
      v-show="!!current_wall">

      <div class="overflow-hidden">

        <div class="holds_holder">

          <div>
            <div class="absolute-top q-pt-md" style="z-index:3; width: 116px">
              <q-btn
                round
                color="secondary"
                icon="zoom_in"
                class="q-ml-md"
                @click="$refs.zoomer.zoomIn()" />

              <q-btn
                round
                color="secondary"
                icon="zoom_out"
                class="q-ml-md"
                @click="$refs.zoomer.zoomOut()" />
            </div>

            <v-zoomer
              ref="zoomer"
              :max-scale="3"
              :double-click-to-zoom="false"
              :style="setZoomerStyle()">

              <div class="holds">

            <div
              v-for="(hold, holdInd) in holds_to_display"
              :key="hold.ind"
              :ref="holdInd"
              :data-try="holdInd"
              v-touch-pan.prevent.mouse="handleDrag">

              <div
                class="hold cursor-pointer"
                @click="selectHold(holdInd, current_wall + '_' + current_wall_ind, $event)"
                :style="setHoldStyle(hold)">
              </div>
            </div>
          </div>

              <img
                :src="wall_photo"
                class="wall_bg"
                @click="wallClick($event)" />
            </v-zoomer>
          </div>
        </div>
      </div>
    </div>

    <!--
    <q-item v-if="s_wall.wall_name != 'select wall' && !!current_wall_route_holds.length && s_wall_ind < (selected_walls.length - 1)" class="q-pa-none q-pt-md block">
      <q-icon name="arrow_forward" color="brown-5" />
    </q-item>
    -->

    <div v-if="walls_list_show">

      <q-dialog
        persistent
        v-model="walls_list_show">
        <q-card
          class="full-width q-pa-md">

          <div class="text-h5 q-mb-md">{{ $t('select_wall') }}</div>

          <q-list>

            <q-item
              v-for="wall in available_walls"
              :key="wall.wall_id"
              v-close-popup
              v-ripple>

              <q-item-section
                thumbnail
                @click="chooseWall(wall)"
                class="cursor-pointer">
                <img :src="wall.wall_bg"/>
              </q-item-section>

              <q-item-section
                @click="chooseWall(wall)"
                class="cursor-pointer">
                {{ wall.wall_name }}
              </q-item-section>
            </q-item>

            <q-item class="float-right">

              <q-btn
                outline
                label="Cancel"
                color="secondary"
                @click="goBack"
                />
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
    </div>

    <div
      class="holds_list absolute-bottom-left q-ml-sm q-mb-sm"
      v-show="!!current_wall_route_holds.length">

      <q-scroll-area
        horizontal
        ref="scrollArea"
        :style="scroll_area_style">

        <q-list class="row items-end no-wrap">

          <q-item
            v-for="(s_wall, wall_id) in route_holds"
            :key="wall_id">

            <q-chip
              size="sm"
              class="absolute-bottom-left full-width text-caption wall_prev">
                {{ getWallName(wall_id) }}
            </q-chip>

            <div class="row items-end no-wrap q-gutter-xs">

              <q-card
                v-for="(hold, holdInd) in s_wall"
                :key="holdInd"
                :ref="holdInd"
                class="hold_prev"
                :style="{backgroundColor: hold.color}">

                <q-card-section
                  v-show="shouldSeeHoldSettings(holdInd, wall_id)"
                  class="q-pa-sm text-body2">

                  <div class="exp_hold_width text-subtitle2">
                    Color
                  </div>

                  <q-icon name="colorize" class="cursor-pointer">

                    <q-popup-proxy transition-show="scale" transition-hide="scale">

                      <q-color
                        no-header
                        no-footer
                        v-model="hold.color"
                        @change="updateHoldCircle(holdInd, hold.color)"/>
                    </q-popup-proxy>
                  </q-icon>
                </q-card-section>

                <q-card-section
                  v-show="shouldSeeHoldSettings(holdInd, wall_id)"
                  class="q-pa-sm text-body2">

                  <div class="text-subtitle2">
                    Type
                  </div>

                  <q-select
                    dense
                    use-input
                    use-chips
                    new-value-mode="add"
                    input-debounce="0"
                    v-model="hold.type"
                    :options="hold_type_options"
                    class="exp_hold_width overflow-hidden"/>
                </q-card-section>

                <q-card-section
                  v-show="shouldSeeHoldSettings(holdInd, wall_id)"
                  class="q-py-none q-px-sm text-body2">

                  <div class="text-subtitle2">
                    Width
                  </div>

                  <q-slider
                    v-model="hold.width"
                    :min="0"
                    :max="300"
                    color="black"/>
                </q-card-section>

                <q-card-section
                  class="cursor-pointer row"
                  @click="selectHold(holdInd, wall_id, $event)">
                  <div class="col-6">
                    {{ holdInd + 1 }}
                  </div>
                  <div class="col-6 q-pb-xs">
                    <q-btn
                      flat
                      v-if="shouldSeeHoldSettings(holdInd, wall_id)"
                      class="float-right"
                      icon="delete"
                      size="sm"
                      color="secondary"
                      @click="removeHold($event, holdInd)" />
                  </div>
                </q-card-section>
              </q-card>

              <q-btn
                v-if="can_continue_on_another_wall && isLastWall(wall_id)"
                icon="arrow_forward"
                color="secondary"
                label="To next wall"
                size="md"
                style="min-width: 100px"
                class="q-mb-md"
                no-caps
                @click="addAnotherWall()" />

                <!--
                <q-icon
                name="arrow_forward"
                color="brown-5"
                size="xl"
                class="q-mb-md"
                v-else />
                -->
            </div>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>

    <!--
    <q-item v-show="!!current_wall_route_holds.length" class="q-pa-none q-pt-md block">
      <q-btn
        v-if="can_continue_on_another_wall"
        icon="arrow_forward"
        color="secondary"
        label="Continue on another wall"
        size="md"
        no-caps
        class="q-ma-md"
        @click="addAnotherWall()" />
      <q-icon name="arrow_forward" color="brown-5" v-else-if="selected_walls.length > 1" />
    </q-item>
    -->
  </div>
</template>

<style scoped>
  .holds_holder {
    overflow: auto;
    max-width: 100%;
    padding-top: 0
  }
  .holds {
    position: relative;
    z-index: 2
  }
  .holds_list {
    z-index: 3;
  }
  .hold_prev {
    z-index: 4
  }
  .wall_prev {
    z-index: 5
  }

  .hold {
    position: absolute;
    border: 3px solid white;
  }
  .wall_bg {
    z-index: 1;
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .exp_hold_width {
    width: 200px;
  }
</style>
<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VueZoomer from 'vue-zoomer'

Vue.use(VueZoomer)

export default {
  data () {
    return {
      delay: 800,
      clicks: 0,
      timer: null,
      active_hold_index: null,
      wall_photo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Njg2MUZFNkM2MzhEMTFFQUE2MDg4ODJFNDVBRkU3OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Njg2MUZFNkQ2MzhEMTFFQUE2MDg4ODJFNDVBRkU3OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ODYxRkU2QTYzOEQxMUVBQTYwODg4MkU0NUFGRTc5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2ODYxRkU2QjYzOEQxMUVBQTYwODg4MkU0NUFGRTc5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjnEdAgAABLWSURBVHja7N17kJ1lfcDx5z27SdZkk2wSLrlCoCRokIsUwsXCjFo7vWixWN3iPxLFAQOG2gg6ZaZ/dAanoCiXgjAiqX8UiA5UHcdeKFplFKFoQSQGSCGQEALkzibsJrvn9HmyLzS0aCDsru95n89n5p0sUXHOOe8+3/09533PFq1WKwAA7a3hKQAAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAEHQAQdABA0AEAQQcAQQcABB0AEHQAQNABQNABAEEHAAQdABB0ABB0AEDQAQBBBwAEHQAQdAAQdABA0AEAQQcABB0ABB0AEHQAQNABAEEHgNrpzP0JKIrCWQDQhlqtlidB0MfEhHh0lcf4eIyLR0cY3hUpyq8B6mIoNTYezfLrPfHYHY/+8hjwFAl6Oz2Xk+MxMR7dl3/2vUedsXj+ormzpi6cMnnCvK4JnTM7Oxs9HY3GW4oiTOzoaHR7yoDa1Hyo2RcH5l1DzeZLg4PNbf0Dgxt3vDiwbv2z2x+75/61qy674q418b/WF49d8XgxHoOetZFV5L5l8Sa33Isy4j0p4vd/95NnHzan55QZPRMXx3gf4vQCGBYj//zmbbvuf/qZbfctft9X7izjvq2M+wGFyJa7oI9E0NN2+fR0fH/lx/7khGNmvb9nStfvxX+XHQ+A/Yd4cNuO/h8/+Miz33l37y3fi3+1OR5bwvBWvaAL+pgEPb3/fVAK+aofXHz+gvkzPmISB3hzk/vjazffuuhd19xURn1TGH4fXtAFfdSCPjUeM1PIFx4xY0lHR6PH6QMwMoaGmtsfe3LzLWXYN8Zju6AL+kgHPV2hPvtHd5z3oRMWzeqd3D3hd502AKPjxb6Bnz246tmVZ37w5m/Gf9wQhq+UF3RBf9NBTxe8zXny3uWXzp87bYnTBWBsrF2/dcURp111ZRn1HYIu6Aca9PSXM//1H8/90OIT5vb2TOk63akCMLa2v9h/7wMPPXP775+zIk3raRu+JeiC/kaCni58m/fQXRdd8PajD7k0/uc+HhfgtyQ2qvnLR5+/8vj3/n16b31d2OdKeEEX9N8U9HQ72uG/vPtTSxctOGS50wOgGh79703XvO1d11wXv3wqlB9KI+iC/uuCnu4hn7/6Py5etvDIgz7l1AColjVrt9yw8Mwvfzl+uTZFXdBfzXbyPpN5jPlfijlANR01f/rSuE5/Oq3Xwe/DEPTXGtLjMe+R7y+7KMb8Qk8HQHXFdXppWq/Tul34dZmvjpkt92LWQ/924bJj33ro55wOAO3h4dXP/d3xf3D9tbFhz3o2TOgp5lPuuu3cD6er2Z0KAO0jrdv/fvu5vWkd92xkHvR4Euz9BLiTj5/T69Y0gLZbwxsnHTenN63j5XruOcl1yz2eAPOf+PFf/c38uT0+AQ6gTa1dv23Fke/80t/Glq3N/bnI8td9xphP/eE3P/bh+XOnLjnAX8MLQAWkdTyu56vjun5TjPr2nJ+L7Laay+31me84ZlavbwWA9leu5zNzf/s0xwd/8CN3X3R+96TxJ/o2AGh/aT1P63pa3wU9n+k8vcUwfeERM87zLQBQH3Fd/0Ra38t1XtAzMH31D5Zd1NHRmOz0B6iPuK53P/bDi9MHzkzP9TnI5ieZ8r2V6Uce3nNOy4VwALUzf97Uc+If18X1flP6LW2CXl9T7rnj42d1NBrT9ByghlN6XN/TOn/GB7+WftXqttwef05b7j1vP/qQP3PKA9RXuc735PjYswh6eZHExMmTxp/sdAeor3Kdn5jjxXG5PODJP/32J/68KNIPMPbbAeo7wIVGWu9PPeur18V/3GpCr5/uIw+bdoZTHaD+4np/Zlr3c3vctQ96+etyJ/VM6TrJaQ5Qf+V6Pym3X5eew5b7hMsvec9RHY2ix247QP3F9X5qWvcv+8LdT8Z/HBD0+uh658nzFnnvHCAfw+t+uCenoOfwHnrX3JlTFji9AfJRrvtdOT3mHII+rnvS+HlOb4B8lOv+OEGvl/ETu8bNdnoD5COu+3PS+p/TY87hPfSOjs5ims9vB8hHXPfTp8V1CHrdXtdGwxXuADnFLa37mQU9hy33RqNRdDm9ATKK2/C6n9WvCM/hwabPFuh0egPko1z3s/pkmUxCZ78dABM6ACDoAMBoy2PL3Y47AIKu6ABQdbbcAUDQAYAqyGLL3ce+AiDo9Sg6ANSaLXcAEHQAoArctgYAJnQAwIRuQAcAQVd0ABhmyx0ABB0AqIJMPikOAAS9BkWXdADqzZY7AAg6AFAFblsDABM6AGBCN6ADgKArOgAMs+UOACZ08zkACLqkA4Cg6zkADPMeOgCY0I3oAGBCBwBM6AZ0AMgp6IoOQM3ZcgcAQQcAqiCTT4qz5Q6AoNeh6ABQa7bcAcCEbkQHABM6AGBCN6ADQE5BV3QAas6WOwCY0M3nACDokg4Agq7nADDMe+gAYEI3ogOACR0AMKEb0AEgp6ArOgA1Z8sdAEzo5nMAEPQxK7qkA1BvttwBwITeNiO6VxoAEzoAYEI3oAOAoCs6AOyPLXcAMKGbzwFA0Mes6JIOQL3ZcgcAE3rbjOheaQBM6ACACd2ADgCCrugAsD+23AHAhG4+BwBBH7OiSzoA9WbLHQBM6G0zonulATChAwAmdAM6AAi6ogOAoMs5AIIu6QAg6HoOAGPCVe4AYEI3ogOAoOs5AIwIW+4AYEI3ogOAoMs5AAj66y+6pANQb95DBwBBBwCqwEVxACDoeg4Agq7oACDocg4AJnQAEHQ9B4DqcNsaAJjQjegAIOh6DgCCrugAkFHQ5RyAunNRHACY0NtlRDejA2BCBwBM6JUY0b3SAAi6ngNAtdlyBwATersM6EZ0AEzoAIAJvQojugkdABM6AGBCr8SI7pUGwIQOAJjQDegAIOiKDgCCLucACHpdii7pANSbi+IAQNABgCpwURwACLqeA4CgKzoACLqcA0BOE7rb1gCoOVe5A4CgAwBV4KI4ABB0PQcAQVd0ABB0OQeAnCZ0t60BUHOucgcAQQcAqsBFcQAg6HoOAII+Zj1XdADqzXvoAGBCb5cR3YQOgAkdABB0AGC0uW0NAARdzwFA0Mes54oOQL15Dx0ATOjtMqKb0AEwoQMAgg4AjDZb7gBgQgcATOhjNaC7bQ0AEzoAYEKvxIhuQgfAhA4ACDoAMNpsuQOACR0AMKGP1YDutjUATOgAgAm9EiO6CR0AEzoAIOgAwGiz5Q4AJnQAwIQ+VgO629YAMKEDACb0SozoJnQATOgAgKADAKPNljsAmNABABP6WA3oblsDwIQOAJjQKzGim9ABMKEDAIIOAIw2W+4AYEIHAEzoYzWgu20NABM6AGBCr8SIbkIHwIQOAAg6ADDabLkDgKC3Sc+9zgAIuqQDQNV5Dx0ATOjtMqCb0AEwoQMAgg4AjDZb7gAg6G3Sc68zAIIu6QBQdd5DBwATersM6CZ0AEzoAICgAwCjzZY7AAh6m/Tc6wyAoEs6AFSd99ABwIRuQAcAQVd0ABgRttwBwITeLgO6CR0AEzoAYEKvwIDuPXQATOgAgAm9GiM6AAi6ogNAtdlyBwATersM6CZ0AEzoAIAJvQIDutcZAEGXdAAQdD0HAEFXdADYPxfFAYAJ3YQOAIKu5wAg6HoOADlN6JIOgKDrOQAIuqIDwKhz2xoACDoAUAV+fSoACHqb9NzrDICgSzoAVJ330AHAhG5ABwBBV3QAGBG23AFA0AGAKnAfOgAIepv03OsMgKBLOgBUnffQAcCEbkAHAEFXdAAYEbbcAcCE3i4DugkdAEFv/557nQGoOVvuAGBCN6MDgKDrOQCMCFvuAGBCN6IDgAkdADChv/4B3YQOgKC3f8+9zgDUnC13ADChm9EBQND1HABGhC13ADChG9EBwIQOAJjQX/+AbkIHQNDbv+deZwBqzpY7AJjQzegAIOh6DgAjwpY7AJjQjegAYEIHAAQdABjmg2UAQNDbpOdeZwBqzpY7AJjQzegAIOh6DgAjwpY7AJjQjegAYEIHAEzoBnQAyCjoLUUHoOZsuQOAoAMAVeAqdwAQdD0HgCqw5Q4AJnQjOgCY0AEAE7oBHQByCrqiAyDocg4AVec9dAAwoZvRAUDQ9RwARoQtdwAwoRvRAcCEDgAIOgAwLJOL4my5AyDo7d9zrzMANWfLHQAEHQCoAretAYCg6zkAVIEtdwAwoRvRAcCEDgAIOgAwzEVxACDo7dJzRQeg3my5A4CgAwBV4LY1ADChAwAmdAM6AJjQAYB8JvRWNFgUuVwvAECrFQZDZvuzOUzozWYr9Du9AfJRrvtNQa+XoaFm2Ob0BshHue4P5fSYc9iGHhoaCltDR5jrFAfIJOhDYbug18/ul3Y3N3SNL451igPk4aXdrfVp/c/pMeew5b5n10BY5/QGyEe57u8R9Hrp37i99bjTGyAf5bqf1QXRWQT950+0Vjm9AfLx4JOtX+UW9KLVqvdtekVRpD/e+ourxt/baIQepzlAvTWbYftxy3efGr9cXffG7av2F8WlFzNGfeeOXeFnPZPCe5zqAPUW1/sH4h87c4p5kstHv/at39z6kdMcoP7K9b4vt8dd5PATTJzQ007EwoevGv9wUfj8eoC6iklrHrt8d7pN+bH0sd85PfbOPF7g9Fnuxa6dA60HurvCYqc8QD3tHAj/Gf/YlVvMk5ym1W1rNrbudLoD1Fdc5/8prfc5PvYil4sG4oSefnhZ+IsvjvtJoxGmOe0B6qXZDFuP+8ye08Pwdnszt8efza8UTS9ujPqW9Ztbtx12ULHUqQ9QL2l9j39syTHmWU3o5ZSefoBZ8NAXO+9vFKHb6Q9Qk+m8FfqO/8xgukbq8RzfP0+yuuK7fJG3rH2+9VWnP0B9xHX9a+V0Ppjrc1DkduN9+V76gvs+33nrxAnhRN8GAO1tYE9YfdLnBj8Qv1wTmzaU6/OQ3T3Z5XsrG1c/01rp2wCg/a3ZuHc9fz7nmGcZ9DLq2z96/dA3NmxprfCtANC+4jr+D39x9dDX45dbc38usttyf+WBF8X4+MeR917ecUt3VzjNtwVAe+nrDz897bKhJfHLJ2LLduf+fHTm+sDTix+jvuGRp1srFx9VnOIjYQHaaQ0PzUfW7d1q3yDmwxp5nxCtHefd1PzGmo2tK50KAO0jrdvn3dhcmdZxz4agv2zj2Vc1b3riuXC1pwKg+tJ6ndbttH57Nv5Xtu+hv/IEFEX6oyMe87/72canDz84XOi0AKimp14IN7zviuaX4pdrc7+q3YT+2tJJ8VQ8Sa6OJ8v1ng6A6nl6096Yfzmt1+W6jQn9/03oL0sXCR72rUsaS3/n0LDc6QFQDWtfCNe8/4rmdWXM934aXO79EvTfHPQk7VrMu3N544KjZoZLXf0O8NuTrmZfszFcWb5nvm7fyVzQBX1/Qd/71/GYefP5Re8xc4ve7q5wqlMFYGz19Yf7Vj3TWvnxG1u3h+EL4Fqvjr2gC/r+g/6yKfGY/S9/XVw6e1pY4nQBGBsbtoYVf/j5vbcUb4jHjtee3gVd0F9/0JP0iXKzv7606D16duidOCG8w2kDMDp2DYT/enRDWPnRG4Y/NCYev/ZDYwRd0N9o0F82NR4zv3VJ8cn5B4Uljcbe6R2AEdBshh1rN4UVH/hC6ytheHt9+/7+N4Iu6Aca9CTdrz4jHd+5tDh/3oxwTkcjHOI0AjgwQ83w/LrN4bY/vbKVLnrbXB6v65Y0QRf0NxP0fcM+PYX95guKP37b7HBWd1c4Pf6rOp1SAPsLcRjs6w8/+dWG8O3zbmx9r4z4lvAG7y0XdEEfiaC/LN3S1h2PafGYdOuy4uw508MpU94STomT+8FOL4BXJvEXdrwU7ntmS7j/I9e27oh/tTMM/8rTvng0D+wHA0EX9JEL+r7SdD45hT0dy/4oLDjxiLDo0Klh4aSuMHdCZ5jV2REO6ihCd6Ox94cA97cDddJsNkPfUCv0DQ6FTQOD4dmd/WH9c9vDYz9/Mqy69p/D42XE0/FiKD8c5s1N+oIu6KMT9P9rQjy6yiNdKT+ujH4KeYdTD6jjIF5O2ynWe8LwFer95TEw0v9ngi7oYxV0AEaRoL9apxPCCQFA+/M+LgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoACDoAICgAwCCDgAIOgAIOgAg6ACAoAMAgg4Agg4ACDoAIOgAgKADgKADAIIOAAg6ACDoAICgA4CgAwCCDgAIOgAg6AAg6ACAoAMAgg4ACDoACDoAIOgAgKADAK/pfwQYAMegqNtMsnxoAAAAAElFTkSuQmCC',

      walls_list_show: true,
      can_continue_on_another_wall: false,
      current_wall: null,
      current_wall_ind: -1,
      // ?
      current_wall_route_holds: [],
      current_hold_ind: -1,
      holds_to_display: [],
      hold_type_options: [
        'Crimp', 'Jug', 'Sloper', 'Custom'
      ],
      selected_walls: [],
      available_walls: [],
      all_walls: [],
      route_holds: {},
      scroll_area_style: {
        width: 'calc(100vw - 16px)',
        height: 266 + 'px'
      }
    }
  },
  watch: {
    active_hold_index (n, o) {
      let scrollTarget = 0
      let holds = []
      const fact = n > o ? 182 : 60

      if (n !== null && o !== null) {
        Object.keys(this.$refs).forEach(k => {
          if (k !== 'scrollArea') {
            holds.push(this.$refs[k][0])
          }
        })

        holds.forEach((hold, i) => {
          if (i === n) {
            scrollTarget = hold.$el.offsetLeft - fact
          }
        })
      }

      this.$refs.scrollArea.setScrollPosition(scrollTarget, 400)
    }
  },
  methods: {
    ...mapGetters([
      'getWalls'
    ]),
    goBack () {
      this.$router.go(-1)
    },

    // Walls methods

    chooseWall (wallData) {
      this.current_wall_ind++

      const propName = wallData.wall_id + '_' + this.current_wall_ind

      this.selected_walls.push(wallData)
      this.available_walls = []

      Object.keys(this.all_walls).forEach((wo, wi) => {
        if (this.all_walls[wo].wall_id !== wallData.wall_id) {
          this.available_walls.push(this.all_walls[wo])
        }
      })

      this.changeWallBg(wallData)

      this.current_wall = wallData.wall_id
      this.route_holds[propName] = this.route_holds[propName] || []
      this.current_wall_route_holds = this.route_holds[propName] || []
      this.walls_list_show = false
    },
    addAnotherWall () {
      this.can_continue_on_another_wall = false
      this.walls_list_show = true
      this.current_wall_route_holds = []
      this.holds_to_display = []
    },
    getWallName (propName) {
      const indStr = propName.split('_')[propName.split('_').length - 1]
      const name = propName.replace('_' + indStr, '').replace('_', ' ')

      return name
    },
    isLastWall (wallId) {
      const allRouteWalls = Object.keys(this.route_holds)

      return allRouteWalls.indexOf(wallId) === allRouteWalls.length - 1
    },
    wallClick (event) {
      this.clicks++

      if (this.clicks === 1) {
        // single click
        const self = this

        this.unselectHold()

        this.timer = setTimeout(() => {
          self.clicks = 0
        }, this.delay)
      } else {
        // double click
        clearTimeout(this.timer)
        this.clicks = 0
        this.addHold(event)
      }
    },
    changeWallBg (wallObj) {
      this.wall_photo = wallObj.wall_bg
    },
    setZoomerStyle () {
      return {
        width: 100 + 'vw',
        height: 'calc(100vh - 208px)',
        zIndex: 1
      }
    },

    // Holds methods

    async addHold (e) {
      console.log('ADD ', this.route_holds[this.current_wall + '_' + this.current_wall_ind], this.current_wall, '_' + this.current_wall_ind)
      let holds = 0
      let currentWallHolds = this.route_holds[this.current_wall + '_' + this.current_wall_ind]
      const holdIndForWall = currentWallHolds.length + 1
      const holdData = {
        ind: holdIndForWall,
        width: 30,
        x: e.offsetX,
        y: e.offsetY,
        color: 'white',
        type: 'Not set'
      }

      await currentWallHolds.push(holdData)
      await this.holds_to_display.push(holdData)

      this.active_hold_index = holdIndForWall - 1
      this.current_hold_ind = holdIndForWall - 1
      this.can_continue_on_another_wall = true
      this.scroll_area_style.height = 266 + 'px'

      for (const wall in this.route_holds) {
        holds += this.route_holds[wall].length
      }

      if (holds >= 3) {
        this.$emit('route-has-holds', true)
      }

      this.$emit('set-hold', { holds: this.route_holds, walls: this.selected_walls.map(w => w.wall_id) })
    },
    selectHold (holdInd, wallId, e) {
      const fract = wallId.split('_')
      const targetWallId = wallId.replace('_' + fract[fract.length - 1], '')
      const targetWallInd = parseInt(fract[fract.length - 1])
      const propName = targetWallId + '_' + targetWallInd
      const targetWallData = this.selected_walls.filter(wO => {
        return wO.wall_id === targetWallId
      })[0]

      if (targetWallInd !== this.current_wall_ind) {
        // selecting hold from another wall
        this.changeWallBg(targetWallData)

        this.current_wall = targetWallId
        this.current_wall_route_holds = this.route_holds[propName] || []
        this.walls_list_show = false

        this.current_wall_ind = targetWallInd
      }

      if (holdInd !== this.active_hold_index) {
        this.active_hold_index = holdInd
        this.scroll_area_style.height = 266 + 'px'
        this.current_hold_ind = holdInd
      } else {
        this.unselectHold()
      }
    },
    unselectHold () {
      this.current_hold_ind = -1
      this.active_hold_index = null
      this.scroll_area_style.height = 67 + 'px'
    },
    async removeHold (holdInd) {
      await this.current_wall_route_holds.splice(holdInd, 1)
      await this.holds_to_display.splice(holdInd, 1)

      this.route_holds[this.current_wall + '_' + this.current_wall_ind] = await this.current_wall_route_holds

      if (!this.current_wall_route_holds.length) {
        this.can_continue_on_another_wall = false
      }

      this.unselectHold()

      // console.log('MAHAI SE', holdInd, this.route_holds[this.current_wall + '_' + this.current_wall_ind], this.current_wall_route_holds)

      this.$emit('set-hold', { holds: this.route_holds, walls: this.selected_walls })
    },
    updateHoldCircle (i, c) {
      this.holds_to_display[this.active_hold_index].color = c
    },
    setHoldStyle (holdObj) {
      return {
        width: holdObj.width + 'px',
        height: holdObj.width + 'px',
        left: (holdObj.x - (holdObj.width / 2)) + 'px',
        top: (holdObj.y - (holdObj.width / 2)) + 'px',
        borderRadius: (holdObj.width / 2) + 'px',
        borderColor: holdObj.color
      }
    },
    handleDrag (e) {
      const currentScale = this.$refs.zoomer.scale

      let targetHold = this.route_holds[this.current_wall + '_' + (this.current_wall_ind)][this.current_hold_ind]

      targetHold.x += (e.delta.x / currentScale)
      targetHold.y += (e.delta.y / currentScale)
    },
    shouldSeeHoldSettings (holdInd, wallId) {
      const realWallId = wallId.replace('_' + wallId.split('_')[wallId.split('_').length - 1], '')

      return this.active_hold_index === holdInd && this.current_wall === realWallId
    }
  },
  created () {
    const wallIds = Array.from(this.$route.query.wall_ids).join('')
    let availableWalls = []

    this.all_walls = this.getWalls()

    Object.keys(this.all_walls).forEach(wallId => {
      if (wallIds.indexOf(wallId) > -1) {
        availableWalls.push(this.all_walls[wallId])
      }
    })

    this.available_walls = availableWalls
  }
}

</script>
