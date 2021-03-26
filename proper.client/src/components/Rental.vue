<template>
  <div class="col rental mt-3">
    <router-link :to="{ name: 'RentalDetailsPage', params: {id: rental.id}}">
      <div class="card" style="height: 13rem;">
        <div class="card-body" :style="{'background-image': `url(${rental.picture})`, 'background-size': 'contain', 'background-repeat': 'no-repeat'} ">
          <h5 class="card-title">
            {{ rental.address.street }}
          </h5>
          <a href="#" class="btn btn-dark">Go somewhere</a>
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
    color: white;
    text-shadow: 0 0 10px #fff
  }
</style>
