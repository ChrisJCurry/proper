<template>
  <div class="col-12 col-md-4 rental mt-4">
    <router-link :to="{ name: 'RentalDetailsPage', params: {id: rental.id}}">
      <div style="height: 20rem" class="card shadow">
        <img class="card-img-top" style="height: 80%" :src="rental.picture" alt="property">
        <div class="card-body">
          <h6 class="card-title" v-if="rental.address">
            {{ rental.address.street }}
          </h6>
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
