<template>
  <div class="rentals-page flex-grow-1">
    <div class="container-fluid">
      <div class="row" v-if="state.rentals.length > 0">
        <Rental v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
      </div>
      <div class="row" v-else>
        <RentalSkeleton v-for="rental in state.rentals" :key="rental.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'

export default {
  name: 'RentalsPage',
  setup() {
    const state = reactive({
      rentals: computed(() => AppState.rentals),
      filterOpen: true
    })
    onMounted(async() => {
      await rentalsService.getAll()
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
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
