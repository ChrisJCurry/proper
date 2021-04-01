<template>
  <div class="desktop-rental-table">
    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th class="col" scope="col">
            Apartment Number
          </th>
          <th class="col" scope="col">
            Address
          </th>
          <th class="col" scope="col">
            Tenants
          </th>
          <th class="col" scope="col">
            Primary Contact
          </th>
          <th class="col" scope="col">
            Avaliable?
          </th>
          <th class="col" scope="col">
            Contact Tenant
          </th>
        </tr>
      </thead>
      <tbody>
        <DesktopRentalTableData v-for="tenant in state.tenants" :key="tenant.id" :rental="rental" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'DesktopRentalTable',
  setup() {
    const route = useRoute()
    const state = reactive({
      tenant: computed(() => AppState.tenants),
      rental: computed(() => AppState.rentals)
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
