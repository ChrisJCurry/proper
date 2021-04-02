<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <!-- <SkeletonLoader /> -->
  </main>
  <footer>
    <CreateNoteModal />
    <CreateTaskModal />
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }

}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
