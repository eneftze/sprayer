<template>
  <div>
    --- {{ da }}
  </div>
</template>

<script>

export default {
  name: 'RoutesList',
  computed: {
    da () {
      return this.$store.state.proba
    }
  }
}
</script>
