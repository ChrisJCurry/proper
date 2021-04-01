<template>
  <div id="desktopcarousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <Rental class="carousel-item" :class="checkActive(index)" v-for="(rental, index) in state.rentals" :key="rental.id" :rental="rental" />
    </div>
    <a @click.prevent="changeIndex(-1)" href="#desktopcarouselcontrols" role="button" data-slide="prev" class="carousel-control-prev">
      <span class="carousel-control-prev-icon"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a @click.prevent="changeIndex(1)" href="#desktopcarouselcontrols" role="button" data-slide="next" class="carousel-control-next">
      <span class="carousel-control-next-icon"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import $ from 'jquery'

export default {
  name: 'DesktopCarousel',
  props: {
    rentals: { type: Object, required: true }
  },
  setup(props) {
    onMounted(() => {
      $('#desktopcarousel').carousel(0)
    })
    const state = reactive({
      rentals: computed(() => AppState.rentals),
      active: { index: 0 }
    })
    return {
      state,
      changeIndex(num) {
        const newIndex = state.active.index + num
        if (newIndex === -1) {
          state.active.index = props.rentals.length - 1
        } else if (newIndex > props.rentals.length - 1) {
          state.activeIndex = 0
        } else state.active.index += num
      },
      checkActive(index) {
        return index === state.active.index ? 'active' : ''
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
