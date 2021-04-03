<template>
  <div class="card">
    <img class="card-img" :src="rental.picture" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">
        {{ rental.address.street }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesktopRentals',
  props: {
    rental: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
