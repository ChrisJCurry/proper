<template>
  <div class="new-rental-page flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <NewRentalAccordion />
  </div>
</template>

<script>
export default {
  name: 'NewRentalPage',
  setup() {
    return {}
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
