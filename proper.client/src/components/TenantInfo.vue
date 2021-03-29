<template>
  <div class="tenant-info">
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
