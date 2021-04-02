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
      <DesktopRentalTableData />
    </tbody>
  </table>
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
