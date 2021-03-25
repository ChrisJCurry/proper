<template>
  <div class="rentals-page">
    <div class="container-fluid">
      <div class="row m-auto">
        <Rental v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
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
    onMounted(() => {
      rentalsService.getAll()
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
