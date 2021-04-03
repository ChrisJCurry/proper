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
import { computed, defineAsyncComponent } from 'vue'
import { AppState } from './AppState'
const CreateNoteModal = defineAsyncComponent(
  () => import('./components/CreateNoteModal')
)
const CreateTaskModal = defineAsyncComponent(
  () => import('./components/CreateTaskModal')
)
const Navbar = defineAsyncComponent(
  () => import('./components/navbar')
)
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: {
    CreateNoteModal, CreateTaskModal, Navbar
  }

}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
