<template>
  <div class="col rental-skeleton mt-3">
    <div class="card" style="height: 13rem;">
      <div class="card-body">
        <h1 class="card-title">
          Loading...
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentalSkeleton',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
h1 {
    color: white;
    text-shadow: 0 0 10px #fff
  }
</style>
