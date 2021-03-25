<template>
  <div class="new-rental-accordion">
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="border-bottom border-dark card-header bg-primary" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              Owner Information
            </button>
          </h2>
        </div>

        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <form action="" class="form-group">
              <input placeholder="Name" type="text" v-model="state.newOwner.name">
              <input placeholder="Phone Number" type="text" v-model="state.newOwner.phoneNumber">
              <input placeholder="Address" type="text" v-model="state.newOwner.address">
              <input placeholder="E-Mail" type="text" v-model="state.newOwner.email">
            </form>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="border-bottom border-dark card-header bg-primary" id="headingTwo">
          <h2 class="mb-0">
            <button class="btn btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
            >
              Rental Info
            </button>
          </h2>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <div class="card-body">
            <input placeholder="Street" type="text" v-model="state.newRental.street">
            <input placeholder="Apartment Number" type="text" v-model="state.newRental.aptNum">
            <input placeholder="City" type="text" v-model="state.newRental.city">
            <input placeholder="Country" type="text" v-model="state.newRental.country">
            <input placeholder="Rent" type="text" v-model="state.newRental.rent">
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header bg-primary" id="headingThree">
          <h2 class="mb-0">
            <button class="btn btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
            >
              Tenant Info
            </button>
          </h2>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div class="card-body">
            <form class="form-group" action="text">
              <input placeholder="Tenant Name(s)" type="text" v-model="state.newTenant.name">
            </form>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header bg-primary" id="headingFour">
          <h2 class="mb-0">
            <button class="btn btn-block text-left collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
            >
              Maintenance Required?
            </button>
          </h2>
        </div>
        <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
          <div class="card-body">
            <form action="text">
              <textarea placeholder="Any maintainence concerns with the property?" name="maintenance" id="maintenance" cols="40" rows="50"></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
// import { ownersService } from '../services/OwnersService'
// import { tenantsService } from '../service/TenantsService'
export default {
  name: 'NewRentalAccordion',
  setup() {
    const state = ({
      newTenant: {},
      newOwner: {},
      newRental: {},
      owner: computed(() => AppState.owner),
      rental: computed(() => AppState.rental),
      tenant: computed(() => AppState.tenant)
    })

    return {
      state,
      async createNewProp(newOwner, newRental, newTenant) {
        try {
          await rentalsService.create(state.newRental)
          // await ownersService.create(state.newOwner)
          // await tenantsService.create(state.newTenant)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
