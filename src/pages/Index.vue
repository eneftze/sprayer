<template>
  <q-page class="col-12">
    <h3 class="text-center">
      Locate
    </h3>
    <h3 class="text-center">Login/Register</h3>
    <q-btn
      rounded
      color="primary"
      size="lg"
      label="Ulala"
      @click="onClick"
    />
  </q-page>
</template>

<script>

function onClick () {
  let db = this.$db
  let proba = {
    _id: 'proba',
    proba: {
      proba: 'proba'
    }
  }

  db.local.get(proba._id).then(function (e) {
    db.local.put(e).then(function (e1) {
    })
  }).catch(function (err) {
    console.log('ERROR', err)
  })
}

export default {
  name: 'PageIndex',
  methods: {
    onClick
  }
}
</script>
