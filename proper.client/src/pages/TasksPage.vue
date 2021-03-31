<template>
  <div class="tasks-page">
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'TasksPage',
  setup() {
    const state = reactive({
      // NOTE use this to get all tasks for your rentals
      tasks: computed(() => {
        const coll = []
        AppState.rentals.forEach(r => {
          coll.push(...r.tasks)
        })
        return coll
      })
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
