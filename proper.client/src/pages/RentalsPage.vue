<template>
  <div class="rentals-page flex-grow-1">
    <div class="container-fluid mt-2" v-if="state.viewportWidth <= 700">
      <div class="row" v-if="state.loading === true">
        <SkeletonLoader />
      </div>

      <div class="row" v-else>
        <Rental v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
      </div>
    </div>
    <div v-else>
      <div v-if="state.loading === true">
        <SkeletonLoader />
      </div>
      <div v-else>
        <div class="container-fluid mt-2 rentals-container">
          <div class="row">
            <Rental v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, defineAsyncComponent } from 'vue'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'
import { onBeforeRouteUpdate } from 'vue-router'

const Rental = defineAsyncComponent(
  () => import('../components/Rental')
)
const SkeletonLoader = defineAsyncComponent(
  () => import('../components/SkeletonLoader')
)
export default {
  name: 'RentalsPage',
  setup() {
    onBeforeRouteUpdate((to, from, next) => { next(true) })
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
      filterOpen: true,
      loading: true
    })
    onMounted(async() => {
      state.loading = true
      window.addEventListener('resize', () => { state.viewportWidth = window.innerWidth })
      await rentalsService.getAll()
      state.loading = false
    })
    return {
      state
    }
  },
  components: {
    Rental, SkeletonLoader
  }
}
</script>

<style lan
    lang="scss" scoped>
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

  .rentals-container {
    height: 20rem;
    overflow: auto;
  }

</style>
