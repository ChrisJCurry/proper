<template>
  <div class="tenant-info">
    <div class="card-body">
      <p>Tenant Name:<span v-for="tenant in state.rentals.tenants" :key="tenant.id"></span></p>
      <p>Primary Contact:<span v-for="primaryContact in state.rentals.tenants.primaryContact" :key="primaryContact.id"></span></p>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Tenant',
  setup() {
    const state = reactive({
      rental: computed(() => AppState.rental)
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
