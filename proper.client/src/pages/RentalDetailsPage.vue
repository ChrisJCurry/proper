<template>
  <div class="container rental-details-page" v-if="state.rental.address">
    <div class="row mt-2 text-center">
      <div class="col-6">
        <button class="btn btn-info btn-block" type="button" data-toggle="modal" data-target="#create-note">
          Add a Note
        </button>
      </div>
      <div class="col-6">
        <button class="btn btn-info btn-block" data-toggle="modal" data-target="#create-task">
          Add a Task
        </button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <img class="img-fluid" :src="state.rental.picture" alt="">
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {{ state.rental.address.street }}
            </h5>
            <p class="card-text">
            </p>
            <div class="row">
              <div class="col-6 p-0">
                <button type="button" data-toggle="modal" data-target="#rental-info" class="btn btn-dark text-primary btn-block">
                  Info
                </button>
              </div>
              <div class="col-6 p-0" v-if="state.showTasks">
                <button class="btn btn-primary text-dark p-1 btn-block" @click="toggle">
                  Notes
                </button>
              </div>
              <div class="col-6 p-0" v-else>
                <button class="btn btn-primary text-dark p-1 btn-block" @click="toggle">
                  Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.showTasks">
      <div class="row">
        <div class="col-12 mt-2" v-for="task in state.rental.tasks" :key="task.id">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <div class="card-text">
                    <h4>Task: {{ task.title }}</h4>
                  </div>
                </div>
                <div class="col-9">
                  <div class="card-text">
                    <h4>Details: {{ task.description }}</h4>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-10 text-right mt-3">
                  <div class="card-text">
                    <h6>Created: {{ new Date(task.createdAt).toLocaleString() }}</h6>
                  </div>
                </div>
                <div class="col-2">
                  <button class="btn btn-secondary">
                    complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.showNotes">
      <div class="row">
        <div class="col-12 mt-2" v-for="note in state.rental.notes" :key="note.id">
          <div class="card">
            <div class="card-body">
              <div class="card-text">
                <h4>note: {{ note.body }}</h4>
              </div>
              <div class="col-4">
                <div class="card-text text-right">
                  created: {{ new Date(note.createdAt).toLocaleString() }}
                </div>
              </div>
              <div class="col-2">
                <button class="btn btn-secondary">
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'
import { rentalsService } from '../services/RentalsService'
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'RentalDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      rental: computed(() => AppState.rental),
      tasks: computed(() => AppState.tasks),
      notes: computed(() => AppState.notes),
      showNotes: false,
      showTasks: true
    })
    onMounted(async() => {
      await rentalsService.getById(route.params.id)
      await rentalsService.getTasksById(route.params.id)
      await rentalsService.getNotesById(route.params.id)
      logger.log(state.rental)
    })
    return {
      state,
      toggle() {
        state.showNotes = !state.showNotes
        state.showTasks = !state.showTasks
      }

    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
  moveCard {
    position: absolute;
    height: 300 px
  }
</style>
