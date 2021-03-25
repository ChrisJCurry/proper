<template>
  <div class="new-rental-accordion row">
    <div class="accordion col-xl-12" id="accordionExample">
      <div class="card">
        <div class="border-bottom border-dark card-header bg-primary" id="headingOne">
          <h2 class="">
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
            <form action="submit" class="form-group">
              <p><input class="mr-1" required placeholder="John Doe" type="text" v-model="state.newOwner.name"></p>
              <p>
                <input class="mr-1"
                       required
                       placeholder="(123) 456-7890"
                       type="tel"
                       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                       v-model="state.newOwner.phoneNumber"
                >
              </p>
              <p><input class="mr-1" required placeholder="404 Not Found Dr" type="text" v-model="state.newOwner.address"></p>
              <input class="mr-1"
                     required
                     placeholder="john.doe@test.com"
                     type="email"
                     name="ownerEmail"
                     id="ownerEmail"
                     v-model="state.newOwner.email"
              >
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
            <p><input class="mr-1" required placeholder="Broadway" type="text" v-model="state.newRental.street"></p>
            <p><input class="mr-1" required placeholder="#A113" type="text" v-model="state.newRental.aptNum"></p>
            <p><input class="mr-1" required placeholder="New York" type="text" v-model="state.newRental.city"></p>
            <p><input class="mr-1" required placeholder="United States of America" type="text" v-model="state.newRental.country"></p>
            <p><input class="mr-1" required placeholder="$1400" type="text" v-model="state.newRental.rent"></p>
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
              <input required placeholder="Tenant Name(s)" type="text" v-model="state.newTenant.name">
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
              <textarea placeholder="What needs fixing?" name="maintenance" id="maintenance" cols="25" rows="10"></textarea>
            </form>
          </div>
        </div>
      </div>
      <button @click="create" class="btn btn-block btn-dark">
        Submit Form
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
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
$transition-collapse: height .50s ease !default;
</style>
