<template>
  <div class="desktop-carousel">
    <div id="desktopcarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <Rental class="carousel-item " v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
      </div>
      <a href="#desktopcarouselcontrols" role="button" data-slide="prev" class="carousel-control-prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a href="#desktopcarouselcontrols" role="button" data-slide="next" class="carousel-control-next">
        <span class="carousel-control-next-icon"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { rentalsService } from '../services/RentalsService'
import { AppState } from '../AppState'

export default {
  name: 'DesktopCarousel',
  setup() {
    const route = useRoute()
    const state = reactive({
      rentals: computed(() => AppState.rentals)
    })
    onMounted(async() => {
      await rentalsService.getById(route.params.id)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
