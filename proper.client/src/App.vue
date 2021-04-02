<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <!-- <SkeletonLoader /> -->
  </main>
  <footer>
    <createNoteModal />
    <createTaskModal />
  </footer>
</template>

<script>
import { computed, defineAsyncComponent } from 'vue'
import { AppState } from './AppState'
const createNoteModal = defineAsyncComponent(
  () => import('./components/CreateNoteModal')
)
const createTaskModal = defineAsyncComponent(
  () => import('./components/CreateTaskModal')
)
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    createNoteModal, createTaskModal
  }

}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
