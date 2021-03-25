<template>
  <div class="col rental mt-3">
    <router-link :to="{ name: 'RentalDetailsPage' }">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            {{ rental.address.street }}
          </h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Rental',
  props: {
    rental: { type: Object, required: true }
  },

  setup() {
    return {

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  a {
    color: black
  }
</style>
