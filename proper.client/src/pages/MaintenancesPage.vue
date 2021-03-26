<template>
  <div class="maintenances-page container-fluid">
    <div class="row px-2">
      <div class="col-12">
        <Maintenance v-for="maintenance in state.maintenances" :key="maintenance.id" :maintenance="maintenance" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { maintenancesService } from '../services/MaintenancesService'

export default {
  name: 'MaintenancesPage',
  setup() {
    const state = reactive({
      maintenances: computed(() => AppState.maintenances)
    })
    onMounted(async() => {
      await maintenancesService.getAll()
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
