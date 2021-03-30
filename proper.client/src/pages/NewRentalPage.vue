<template>
  <div>
    <div class="new-rental-page">
      <div class="d-lg-none">
        <NewRentalAccordion />
      </div>
    </div>
  </div>
  <div class="d-none d-lg-block">
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
