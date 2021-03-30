<template>
  <div class="rentals-page">
    <div class="container-fluid">
      <div class="row m-auto" v-if="state.rentals.length > 0">
        <Rental v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
      </div>
      <div v-else>
        <h1>Loading...</h1>
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
  background-image: url('../assets/img/boiseDowntown.jpg');
  background-size: cover ;
}

h1 {
    color: white;
    text-shadow: 0 0 10px #fff
  }
</style>
