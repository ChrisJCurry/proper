<template>
  <div class="col-12 col-md-4 rental mt-3">
    <router-link :to="{ name: 'RentalDetailsPage', params: {id: rental.id}}">
      <div style="max-height: 60vh" class="card shadow img-fluid">
        <img class="card-img-top" :src="rental.picture" alt="property">
        <div class="card-body">
          <h5 class="card-title" v-if="rental.address">
            {{ rental.address.street }}
          </h5>
          <a href="#" class="btn btn-dark text-light">Rental Info</a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'

export default {
  name: 'Rental',
  props: {
    rental: { type: Object, required: true }
  },

  setup(props) {
    const route = useRoute()
    const state = reactive({
      route: useRoute(),
      account: computed(() => AppState.account),
      rentals: computed(() => AppState.rentals),
      notes: computed(() => AppState.notes),
      user: computed(() => AppState.user),
      task: computed(() => AppState.task)

    })
    return {
      state,
      route,

      async edit() {
        rentalsService.edit(state.rental)
        state.edit = false
      },

      async delete() {
        return await rentalsService.delete(props.rental.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  a {
    color: black
  }
</style>
