<template>
  <div>
    <div class="new-rental-page d-none d-xs-block flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <NewRentalAccordion />
    </div>
  </div>
  <div class="d-none d-xl-block">
    <h1>YOU'RE SEEING THIS ON DESKTOP</h1>
  </div>
</template>

<script>
export default {
  name: 'NewRentalPage',
  setup() {
    return {
      // d-none d-med-block
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.new-rental-page {
  background-image: url('../assets/img/boiseDowntown.jpg');
  background-size: cover ;
  }

</style>
