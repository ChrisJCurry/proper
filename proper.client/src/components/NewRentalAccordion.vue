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
            <p><input class="mr-1" required placeholder="Broadway" type="text" v-model="state.address.street"></p>
            <p><input class="mr-1" required placeholder="#A113" type="text" v-model="state.address.aptNum"></p>
            <p><input class="mr-1" required placeholder="New York" type="text" v-model="state.address.city"></p>
            <p><input class="mr-1" required placeholder="United States of America" type="text" v-model="state.address.country"></p>
            <p><input class="mr-1" required placeholder="ZIP Code" type="text" v-model="state.address.zip"></p>
            <p><input class="mr-1" required placeholder="$1400" type="text" v-model="state.newRental.rent"></p>
            <p><input class="mr-1" required placeholder="Year Built" type="text" v-model="state.newRental.yearBuilt"></p>
          </div>
        </div>
      </div>
      <div class="card ">
        <div class="card-header border-bottom border-dark bg-primary" id="headingThree">
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
            <span v-if="!state.showCreateTenant">
              <button @click="state.showCreateTenant = !state.showCreateTenant" class="btn btn-dark mb-1" type="button">
                New Tenant
              </button>
            </span>
            <form @submit.prevent="createTenant(state.newTenant)" v-if="state.showCreateTenant">
              <input required placeholder="Tenant Name" type="text" v-model="state.newTenant.name">
              <p>
                <input class="mt-1"
                       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                       required
                       placeholder="Phone Number"
                       type="text"
                       v-model="state.newTenant.phoneNum"
                >
              </p>
              <button type="submit" class="btn btn-dark text-primary">
                Add Tenant
              </button>
            </form>
            <div v-if="state.tenants">
              <div v-for="tenant in state.tenants" :key="tenant.id">
                <div class="bg-primary border border-danger block py-1 my-1">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-8">
                        <div class="title">
                          {{ tenant.name }}
                          <hr>
                        </div>
                      </div>
                      <div class="col-1 offset-1">
                        <button type="button" class="delete btn btn-sm btn-dark" @click="removeTenant(tenant)">
                          x
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div>
                          <span class="font-weight-bold">-</span> {{ tenant.phone }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header bg-primary border-bottom border-dark" id="headingFour">
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
            <span v-if="!state.showCreateForm">
              <button @click="state.showCreateForm = !state.showCreateForm" class="btn btn-dark mb-1" type="button">
                New Task
              </button>
            </span>
            <form v-if="state.showCreateForm" action="text" @submit.prevent="createMaintenanceTask(state.newTask)">
              <div class="form-group row" v-if="state.showWarning">
                <div class="col-12 bg-danger">
                  There's nothing to add.
                </div>
              </div>
              <div class="form-group row justify-content-center">
                <p><input placeholder="Title" sclass="form-inline" type="text" v-model="state.newTask.title"></p>
              </div>
              <div class="form-group row justify-content-center">
                <textarea
                  placeholder="What needs to be done?"
                  name="maintenance"
                  id="maintenance"
                  cols="23"
                  rows="5"
                  v-model="state.newTask.description"
                >
              </textarea>
              </div>
              <div class="form-group row justify-content-center">
                <button type="submit" class="btn btn-dark text-primary">
                  Submit Task
                </button>
              </div>
            </form>
            <div v-if="state.maintenance.tasks">
              <div v-for="task in state.maintenance.tasks" :key="task.id">
                <div class="bg-primary border border-danger block py-1 my-1">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-8">
                        <div class="title">
                          {{ task.title }}
                          <hr>
                        </div>
                      </div>
                      <div class="col-1 offset-1">
                        <button type="button" class="delete btn btn-sm btn-dark" @click="removeMaintenanceTask(task)">
                          x
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div>
                          <span class="font-weight-bold">-</span> {{ task.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button @click.prevent="create" type="button" class="btn btn-block btn-dark text-primary">
        Submit Form
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
import { maintenancesService } from '../services/MaintenancesService'
import { ownersService } from '../services/OwnersService'
import { tenantsService } from '../services/TenantsService'
export default {
  name: 'NewRentalAccordion',
  setup() {
    const state = reactive({
      showCreateForm: true,
      showCreateTenant: true,
      newTenant: {},
      newOwner: {},
      newRental: {},
      address: {},
      ownerAddress: {},
      maintenance: {},
      newTask: {},
      showWarning: false,
      owners: [],
      tenants: []
    })

    return {
      state,
      async createMaintenanceTask(newTask) {
        if (state.newTask.title && state.newTask.description) {
          try {
            if (!state.maintenance.id) {
              state.maintenance = await maintenancesService.create(state.maintenance)
              state.maintenance.tasks = []
              state.maintenance.tasks.push(newTask)
              await maintenancesService.edit(state.maintenance)
              state.newTask = {}
            } else {
              state.maintenance.tasks.push(newTask)
              await maintenancesService.edit(state.maintenance)
              state.newTask = {}
            }
          } catch (error) {
            logger.error(error)
          }
        } else {
          state.showWarning = true
          return
        }
        state.showWarning = false
      },
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
          state.newRental.ownerId = state.newOwner.id
          state.newRental.tenants = []
          state.newRental.tenants = state.tenants
          state.newRental.address = state.address
          state.newRental = await rentalsService.create(state.newRental)
          state.maintenance.rentalId = state.newRental
          await maintenancesService.edit(state.maintenance)
          state.newRental = {}
          state.address = {}
        } catch (error) {
          logger.error(error)
        }
      },
      async removeMaintenanceTask(task) {
        try {
          const res = window.confirm('Are you sure you want to remove this task?')
          if (!res) {
            return
          }
          await maintenancesService.edit(state.maintenance)
          state.maintenance.tasks.splice(state.maintenance.tasks.indexOf(task), 1)
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
.plus-size{
  font-size: 16px;
  font-weight: 400;
}

.title {
  text-align: center;
}

.title hr {
  padding: 0;
  margin-top: 0;
  width: 100%;
  border-bottom: 1px solid black;
}
</style>
