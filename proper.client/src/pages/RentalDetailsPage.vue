<template>
  <div class="rental-details-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <img src="" alt="">
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                Address
              </h5>
              <p class="card-text">
              </p>
              <button>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- <Maintenance /> -->
    </div>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'
import { rentalsService } from '../services/RentalsService'
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'RentalDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      rentals: computed(() => AppState.rentals)
    })
    onMounted(() => {
      rentalsService.getById(route.params.id)
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
