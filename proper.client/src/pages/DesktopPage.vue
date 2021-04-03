<template>
  <div class="container-fluid">
    <DesktopCarousel />
  </div>
  <div class="container-fluid">
    <DesktopRentalTable />
  </div>
  <div class="container-fluid">
    <DesktopRentalTasks />
  </div>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
const DesktopCarousel = defineAsyncComponent(
  () => import('../components/DesktopCarousel')
)
const DesktopRentalTable = defineAsyncComponent(
  () => import('../components/DesktopCarousel')
)
const DesktopRentalTasks = defineAsyncComponent(
  () => import('../components/DesktopCarousel')
)
export default {
  name: 'DesktopPage',
  setup() {
    return {
    }
  },
  components: {
    DesktopCarousel, DesktopRentalTable, DesktopRentalTasks
  }
}
</script>

<style lang="scss" scoped>

</style>
