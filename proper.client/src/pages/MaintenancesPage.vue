<template>
  <div class="maintenance-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Maintenance v-for="maintenance in state.maintenances" :key="maintenance._id" :maintenance="maintenance" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
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
