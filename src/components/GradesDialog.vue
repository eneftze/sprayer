<template>
  <div class="grades row q-mx-lg q-mt-lg">
    <h2 class="text-subtitle1 text-weight-light inline q-mr-md">Route grade</h2>

    <q-btn outline :label="route_grade" @click="fixed = true" no-caps class="q-mt-sm" />

    <q-dialog v-model="fixed">
      <q-card>
        <q-card-section class="scroll">
          <q-table
            dense
            title="Grades"
            virtual-scroll
            separator="horizontal"
            row-key="name"
            hide-bottom
            selection="single"
            :data="g_d"
            :columns="columns"
            :virtual-scroll-item-size="38"
            :visible-columns="visibleGrades"
            :pagination="pagination"
            :rows-per-page-options="[38]"
            :selected.sync="selected">
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr class="cursor-pointer" :props="props" @click.native="props.selected = !props.selected; setGrade()">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
      </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="dont know" color="secondary" no-caps v-close-popup />
          <q-btn label="Choose" color="primary" @click="setGrade" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<style scoped>
  .grades {
    border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  }
</style>
<script>
import gradesData from '../assets/grades'
const bData = gradesData.filter((dE, dI) => {
  return dI > 10
})

export default {
  name: 'GradesDialog',
  props: [
    'grades'
  ],
  data () {
    return {
      g_d: gradesData,
      fixed: false,
      route_grade: 'Choose from table',
      selected: [],
      visibleGrades: [],
      allGradesArray: ['sport', 'usa', 'fb', 'v_grade', 'uiaa'],
      columns: [
        {
          name: 'sport',
          label: 'Sport',
          align: 'center',
          field: 'sport'
        },
        {
          name: 'usa',
          label: 'USA',
          align: 'center',
          classes: 'bg-grey-6 text-white',
          field: 'usa'
        },
        {
          name: 'v_grade',
          label: 'Hueco',
          align: 'center',
          field: 'v_grade'
        },
        {
          name: 'fb',
          label: 'Font',
          classes: 'bg-grey-6 text-white',
          align: 'center',
          field: 'fb'
        },
        {
          name: 'uiaa',
          label: 'UIAA',
          align: 'center',
          field: 'uiaa'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  methods: {
    setGrade () {
      this.route_grade = this.grades === 'all_grades' ? this.selected[0].sport + ' | ' + this.selected[0].usa + ' | ' + this.selected[0].uiaa : this.selected[0].v_grade + ' | ' + this.selected[0].fb
      this.fixed = false
      this.$emit('set-grade', this.selected[0])
    }
  },
  updated () {
    if (this.grades === 'all_grades') {
      this.visibleGrades = this.allGradesArray
      this.g_d = gradesData
    } else {
      this.visibleGrades = this.grades
      this.g_d = bData
    }
  }
}

</script>
