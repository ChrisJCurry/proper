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
            <form class="form-group" action="text">
              <input required placeholder="Tenant Name(s)" type="text" v-model="state.newTenant.name">
              <p>
                <input class="mt-1"
                       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                       required
                       placeholder="Primary Phone Number"
                       type="text"
                       v-model="state.newTenant.phoneNum"
                >
              </p>
            </form>
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
            <form v-if="state.showCreateForm" action="text" @submit.prevent="createNewMaintenanceTask(state.newTask)">
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
                <button type="submit" class="btn btn-dark">
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
      <button @click="create" class="btn btn-block btn-dark">
        Submit Form
      </button>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { rentalsService } from '../services/RentalsService'
import { maintenancesService } from '../services/MaintenancesService'
export default {
  name: 'NewRentalAccordion',
  setup() {
    const state = reactive({
      showCreateForm: true,
      newTenant: {},
      newOwner: {},
      newRental: {},
      maintenance: {},
      newTask: {},
      showWarning: false,
      owner: computed(() => AppState.owner),
      rental: computed(() => AppState.rental),
      tenant: computed(() => AppState.tenant)
    })

    return {
      state,
      async createNewMaintenanceTask(newTask) {
        if (newTask.title || newTask.description) {
          try {
            if (!state.maintenance.id) {
              state.maintenance = await maintenancesService.create(state.maintenance)
              state.maintenance.tasks.push(newTask)
              state.newTask = {}
              await maintenancesService.edit(state.maintenance)
            } else {
              state.maintenance.tasks.push(newTask)
              state.newTask = {}

              await maintenancesService.edit(state.maintenance)
            }
          } catch (error) {
            logger.error(error)
          }
        } else {
          console.log('dont put an empty object there, fool.')
          state.showWarning = true
          return
        }
        state.showWarning = false
      },
      async createNewProp(newOwner, newRental, newTenant) {
        try {
          await rentalsService.create(newRental)
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
          state.maintenance.tasks.splice(state.maintenance.tasks.indexOf(task), 1)
          await maintenancesService.edit(state.maintenance)
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
