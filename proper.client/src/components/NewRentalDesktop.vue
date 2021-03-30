<template>
  <div class="new-rental-desktop">
    <h4 class="card-title round card-header bg-primary">
      Owner Information
    </h4>
    <div class="card col-12 d-grow-flex">
      <form action="submit" class="form-group">
        <p><input class="mr-1" required placeholder="John Doe" type="text" v-model="state.newOwner.name"></p>
        <p>
          <input class="mr-1"
                 required
                 placeholder="(123) 456-7890"
                 type="tel"
                 pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                 v-model="state.newOwner.phone"
          >
        </p>
        <p><input class="mr-1" required placeholder="Street" type="text" v-model="state.ownerAddress.street"></p>
        <p><input class="mr-1" required placeholder="City" type="text" v-model="state.ownerAddress.city"></p>
        <p><input class="mr-1" required placeholder="State" type="text" v-model="state.ownerAddress.state"></p>
        <p><input class="mr-1" required placeholder="ZIP Code" type="text" v-model="state.ownerAddress.zip"></p>
        <p><input class="mr-1" required placeholder="Country" type="text" v-model="state.ownerAddress.country"></p>
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
    <div class="card">
      <div class="bg-primary card-title card-header">
        <h4>
          Rental Information
        </h4>
      </div>
      <div class="card-body">
        <p><input class="mr-1" required placeholder="Broadway" type="text" v-model="state.address.street"></p>
        <p><input class="mr-1" required placeholder="#A113" type="text" v-model="state.address.aptNum"></p>
        <p><input class="mr-1" required placeholder="New York" type="text" v-model="state.address.city"></p>
        <p><input class="mr-1" required placeholder="United States of America" type="text" v-model="state.address.country"></p>
        <p>
          <input class="mr-1"
                 required
                 pattern="[0-9]{5}"
                 placeholder="ZIP Code"
                 type="text"
                 v-model="state.address.zip"
          >
        </p>
        <p><input class="mr-1" required placeholder="$1400" type="text" v-model="state.newRental.rent"></p>
        <p><input class="mr-1" required placeholder="Year Built" type="text" v-model="state.newRental.yearBuilt"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
import { ownersService } from '../services/OwnersService'
import { tenantsService } from '../services/TenantsService'
import { onBeforeRouteLeave } from 'vue-router'
export default {
  name: 'NewRentalDesktop',
  setup() {
    const state = reactive({
      showCreateForm: true,
      showCreateTenant: true,
      showWarning: false,
      newTenant: {},
      newOwner: {},
      newRental: {},
      rent: 0,
      yearBuilt: 0,
      address: {},
      ownerAddress: {},
      maintenance: {},
      newTask: {},
      owners: [],
      tenants: [],
      createdRental: false
    })

    onBeforeRouteLeave(async() => {
      if (!state.createdRental) {
        try {
          if (state.tenants) {
            logger.log(state.tenants)
            state.tenants.forEach(async(tenant) => await tenantsService.deleteBeforeRentalCreation(tenant.id))
          }
        } catch (err) {
          logger.error(err)
        }
      }
    })

    onMounted(async() => {
      state.newRental = await rentalsService.create(state.newRental)
      logger.log(state.newRental)
    })

    return {
      state,
      async createOwner() {
        try {
          state.newOwner.address = state.ownerAddress
          state.newOwner = await ownersService.create(state.newOwner)
          state.owners.push(state.newOwner)
          state.newOwner = {}
          state.ownerAddress = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async createTenant(newTenant) {
        try {
          newTenant.rentalId = state.newRental.id
          newTenant = await tenantsService.create(newTenant)
          state.tenants.push(newTenant)
          state.newTenant = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async create() {
        try {
          state.newOwner.address = state.ownerAddress
          state.newOwner = await ownersService.create(state.newOwner)
          state.newRental.tenants = []
          state.newRental.tenants = state.tenants
          state.newRental.address = state.address
          state.newRental = await rentalsService.create(state.newRental)
          state.newRental = {}
          state.address = {}
          state.createdRental = true
        } catch (error) {
          logger.error(error)
        }
      },
      async removeTenant(tenant) {
        try {
          await tenantsService.delete(tenant.id)
          state.tenants.splice(state.tenants.indexOf(tenant), 1)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
