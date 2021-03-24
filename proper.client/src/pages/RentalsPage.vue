<template>
  <div class="rentals-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Board v-for="boardData in state.boards" :key="boardData.id" :board="boardData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RentalsPage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
