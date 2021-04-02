<template>
  <div class="container-fluid d-lg-none new-rental-page">
    <newRentalAccordion />
  </div>
  <div class="container-fluid d-none d-lg-block p-0 new-rental-page">
    <newRentalDesktop />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const newRentalAccordion = defineAsyncComponent(
  () => import('../components/NewRentalAccordion')
)
const newRentalDesktop = defineAsyncComponent(
  () => import('../components/NewRentalDesktop')
)
export default {
  name: 'NewRentalPage',
  setup() {
    return {
      // d-none d-med-block
    }
  },
  components: {
    newRentalAccordion, newRentalDesktop
  }
}
</script>

<style lang="scss" scoped>
.new-rental-page {
  background-image: url('../assets/img/boiseDowntown.jpg');
  background-size: cover ;
  }

</style>
