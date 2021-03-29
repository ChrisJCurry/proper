<template>
  <div class="col rental mt-3">
    <router-link :to="{ name: 'RentalDetailsPage', params: {id: rental.id}}">
      <div class="card" style="height: 13rem;">
        <div class="card-body" :style="{'background-image': `url(${rental.picture})`, 'background-size': 'contain', 'background-repeat': 'no-repeat'} ">
          <h5 class="card-title">
            {{ rental.address.street }}
          </h5>
          <a href="#" class="btn btn-dark">Rental Info</a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
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
      user: computed(() => AppState.user)

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
