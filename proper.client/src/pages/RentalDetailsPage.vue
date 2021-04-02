<template>
  <div class="container-fluid">
    <div class="row">
      <div style="height: 15vh" class="text-white">
        Property Management Software, manage rentals
      </div>
    </div>
    <div class="rental-details-page" v-if="state.rental.address">
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
          <div class="card shadow">
            <img class="card-img-top img-fluid" :src="state.rental.picture" alt="property">
            <div class="card-body">
              <h5 class="card-title">
                {{ state.rental.address.street }}
              </h5>
              <p class="card-text">
              </p>
              <div class="row justify-content-center">
                <div class="btn-group btn-block" role="group" aria-label="Basic example">
                  <button class="btn btn-primary text-dark" @click="toggle">
                    Notes
                  </button>

                  <button type="button" data-toggle="modal" data-target="#rental-info-modal" class="btn btn-dark text-primary">
                    Rental Info
                  </button>

                  <button class="btn btn-primary text-dark" @click="toggle">
                    Tasks
                  </button>
                </div>
              </div>
              <RentalInfoModal />
            </div>
          </div>
        </div>
      </div>
      <div v-if="state.showTasks">
        <h4 class="text-center mt-3">
          Tasks
        </h4>
        <div class="row">
          <div class="col-12 mt-2" v-for="task in state.tasks" :key="task.id">
            <div v-if="task.closed">
              <div class="card overlay" :id="task.id">
                <div class="card-body p-0 muted">
                  <h6 class="card-header text-center bg-primary">
                    {{ task.title }}
                  </h6>

                  <div class="card-text mt-1 ml-2">
                    {{ task.description }}
                  </div>
                  <ul class="list-group list-group-flush mt-3 ml-5">
                    <li class="mt-1">
                      Created: {{ new Date(task.createdAt).toLocaleString() }}
                    </li>

                    <li class="mt-1">
                      Due: {{ new Date(task.dueDate).toLocaleString() }}
                    </li>
                  </ul>
                  <div class="btn-group btn-block btn-warning mt-3" role="group" aria-label="Basic example">
                    <button class="btn btn-dark" @click="disableTask(task)">
                      <h6 class="m-0">
                        Reactivate
                      </h6>
                    </button>

                    <button class="btn btn-warning" type="button" @click="removeTask(task)">
                      Delete Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="card" :id="task.id">
                <div class="card-body p-0 shadow">
                  <h6 class="card-header text-center bg-primary">
                    {{ task.title }}
                  </h6>

                  <div class="card-text mt-1 ml-2">
                    {{ task.description }}
                  </div>
                  <ul class="list-group list-group-flush mt-3 ml-5">
                    <li class="mt-1 small">
                      Created: {{ new Date(task.createdAt).toLocaleString() }}
                    </li>

                    <li class="mt-1 small">
                      Due: {{ new Date(task.dueDate).toLocaleString() }}
                    </li>
                  </ul>

                  <button class="btn btn-dark btn-block mt-3" @click="disableTask(task)">
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state.showNotes">
      <h4 class="text-center mt-3">
        Notes
      </h4>
      <div class="row text-center">
        <div class="col-12" v-for="note in state.notes" :key="note.id">
          <div class="card shadow bg-white rounded mt-2">
            <div class="card-body p-0">
              <div class="card-text mt-1">
                {{ note.body }}
              </div>

              <div class="card-text text-center mt-2">
                <small>created: {{ new Date(note.createdAt).toLocaleString() }}</small>
              </div>
              <button class="btn btn-sm btn-block btn-dark mt-2" @click="removeNote(note)">
                Delete
              </button>
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
import { tasksService } from '../services/TasksService'
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'

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
      await tasksService.getTasksByRentalId(route.params.id)
      await notesService.getNotesByRentalId(route.params.id)
    })
    return {
      state,
      toggle() {
        state.showNotes = !state.showNotes
        state.showTasks = !state.showTasks
      },
      async removeNote(note) {
        await notesService.delete(note)
      },
      async disableTask(task) {
        await tasksService.edit(task)
        tasksService.getTasksByRentalId(task.rentalId)
      },
      async removeTask(task) {
        await tasksService.delete(task)
        await tasksService.getAll()
      }

    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
.font{
  font-family: 'Open Sans Condensed', sans-serif;
}

.muted {
  opacity: 0.35;
}
</style>
