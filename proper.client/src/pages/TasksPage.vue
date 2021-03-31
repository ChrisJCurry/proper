<template>
  <div class="tasks-page">
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'

export default {
  name: 'TasksPage',
  setup() {
    const state = reactive({
      rentals: computed(() => AppState.rentals),
      // NOTE use this to get all tasks for your rentals
      tasks: computed(() => {
        const coll = []
        AppState.rentals.forEach(r => {
          coll.push(...r.tasks)
        })
        return coll
      })
    })
    onMounted(async() => {
      await rentalsService.getAll()
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
