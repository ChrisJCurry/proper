<template>
  <tr>
    <td scope="row">
      {{ rental.address.aptNum }}
    </td>
    <td>
      {{ rental.address.street }}
    </td>
    <!--TODO NULL CHECK WITH V-IF-->
    <td>
      {{ state.tenant.name }}
    </td>
    <td>
      {{ rental.tenants[1] }}
    </td>
    <td v-if="rental.tenant">
      <span v-if="!rental.closed">
        <h6 class="text-success">OCCUPIED</h6>
      </span>
      <span v-if="rental.closed">
        <h6 class="text-warning">UNOCCUPIED</h6>
      </span>
    </td>
    <td>
      <button @click="nodemailerstuff" class="btn btn-success">
        E-Mail Tenant
      </button>
    </td>
  </tr>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { rentalsService } from '../services/RentalsService'
import { AppState } from '../AppState'
export default {
  name: 'DesktopRentalTableData',
  props: {
    rental: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tenant: computed(() => AppState.tenants)
    })
    onMounted(async() => {
      await rentalsService.getTenantsByRentalId(props.rental.tenants)
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
