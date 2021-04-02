<template>
  <div class="rentals-page flex-grow-1">
    <div class="container-fluid" v-if="state.viewportWidth <= 700">
      <Suspense v-if="state.rentals">
        <div class="row" v-if="state.rentals.length > 0">
          <rentalPage v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
        </div>
      </Suspense>
      <div class="row" v-else>
        <SkeletonLoader />
      </div>
    </div>
    <div v-else>
      <Suspense v-if="state.rentals">
        <desktopCarousel :rentals="state.rentals" />
        <desktopRentalTable :rentals="state.rentals" />
        <desktopRentalTasks :rentals="state.rentals" />
      </Suspense>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, defineAsyncComponent } from 'vue'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'
const rentalPage = defineAsyncComponent(
  () => import('../components/Rental')
)
const desktopCarousel = defineAsyncComponent(
  () => import('../components/DesktopCarousel')
)
const desktopRentalTable = defineAsyncComponent(
  () => import('../components/DesktopRentalTable')
)
const desktopRentalTasks = defineAsyncComponent(
  () => import('../components/DesktopRentalTasks')
)
export default {
  name: 'RentalsPage',
  setup() {
    const state = reactive({
      viewportWidth: window.innerWidth,
      rentals: computed(() => AppState.rentals),
      // NOTE use this to get all tasks for your rentals
      tasks: computed(() => {
        const coll = []
        AppState.tasks.forEach(r => {
          coll.push(...r)
        })
        return coll
      }),
      filterOpen: true
    })
    onMounted(async() => {
      window.addEventListener('resize', () => { state.viewportWidth = window.innerWidth })
      await rentalsService.getAll()
    })
    return {
      state
    }
  },
  components: {
    rentalPage, desktopCarousel, desktopRentalTable, desktopRentalTasks
  }
}
</script>

<style lan
    DesktopCarouselg="scss" scoped>
.rentals-page {
  background: linear-gradient(-45deg, #8f8389, #899985);
  background-size: 100% 100%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

h1 {
    color: white;
    text-shadow: 0 0 10px #fff
  }
</style>
