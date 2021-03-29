<template>
  <div class="rental-details-page">
    <div class="container" v-if="state.rental.address">
      <button class="btn btn-info my-2" type="button" data-toggle="modal" data-target="#create-note">
        Add a Note
      </button>
      <div class="row mt-3">
        <div class="col-12">
          <img class="img-fluid" :src="state.rental.picture" alt="">
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ state.rental.address.street }}
              </h5>
              <p class="card-text">
              </p>
              <div class="row">
                <div class="col-6 p-0">
                  <button type="button" data-toggle="modal" data-target="#rental-info" class="btn btn-dark text-primary btn-block">
                    Details
                  </button>
                </div>
                <div class="col-6 p-0">
                  <button class="btn btn-primary text-dark p-1 btn-block">
                    Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <Note v-for="note in state.notes" :key="note" :note="note" />
      </div>
      <div class="row">
        <Maintenance v-for="maintenance in state.maintenances" :key="maintenance" :maintenance="maintenance" />
      </div>
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
      rental: computed(() => AppState.rental)
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
  moveCard {
    position: absolute;
    height: 300 px
  }
</style>
