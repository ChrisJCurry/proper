<template>
  <div class="col-12 col-md-6 rental mt-3">
    <router-link :to="{ name: 'RentalDetailsPage', params: {id: rental.id}}">
      <div class="card shadow p-3 mb-5 bg-white rounded" style="height: 13rem;">
        <div class="card-body" :style="{'background-image': `url(${rental.picture})`, 'background-size': 'contain', 'background-repeat': 'no-repeat'} ">
          <h5 class="card-title" v-if="rental.address">
            {{ rental.address.street }}
          </h5>
          <a href="#" class="btn btn-dark p-0 px-1">Rental Info</a>
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
    color: white;
    text-shadow: 0 0 10px #fff
  }
</style>
