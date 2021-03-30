<template>
  <div class="container-fluid d-lg-none new-rental-page">
    <NewRentalAccordion />
  </div>
  <div class="container-fluid d-none d-lg-block p-0 new-rental-page">
    <NewRentalDesktop />
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
