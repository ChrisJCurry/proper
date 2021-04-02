<template>
  <table class="table table-striped table-hover table-dark mt-2">
    <thead class="thead-light">
      <tr>
        <th scope="col">
          Apartment Number
        </th>
        <th scope="col">
          Address
        </th>
        <th scope="col">
          Tenants
        </th>
        <th scope="col">
          Primary Contact
        </th>
        <th scope="col">
          Avaliable?
        </th>
        <th scope="col">
          Contact Tenant
        </th>
      </tr>
    </thead>
    <tbody>
      <DesktopRentalTableData v-for="rental in state.rentals" :key="rental.id" :rental="rental" />
    </tbody>
  </table>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'
export default {
  name: 'DesktopRentalTable',
  setup() {
    const route = useRoute()
    const state = reactive({
      tenants: computed(() => AppState.tenants),
      rentals: computed(() => AppState.rentals)
    })
    onMounted(async() => {
      await rentalsService.getAll()
    })
    return {
      route,
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
