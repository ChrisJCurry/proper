<template>
  <div class="tenant-info">
    <div class="card-body">
      <p>Tenant Name:</p><span v-for="tenant in state.tenants" :key="tenant.id"></span>
      <p>Primary Contact:</p><span v-for="primaryContact in state.tenants.primaryContact" :key="primaryContact.id"></span>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'TenantInfo',
  setup() {
    const state = reactive({
      tenant: computed(() => AppState.tenant)
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
