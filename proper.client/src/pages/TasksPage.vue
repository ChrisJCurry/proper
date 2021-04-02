<template>
  <div class="container-fluid">
    <div class="row">
      <div style="height: 12vh" class="text-white">
        Property Management Software, manage rentals
      </div>

      <div class="col-12">
        <h4 class="text-center mt-3">
          Tasks
        </h4>
      </div>
    </div>
    <div class="row">
      <div class="btn-group btn-block" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary text-dark" @click="sortByComplete">
          Completed
        </button>

        <button type="button" class="btn btn-dark text-primary" @click="sortByDueDate">
          Due Date
        </button>

        <button type="button" class="btn btn-primary text-dark" @click="sortByCreationDate">
          Created Date
        </button>
      </div>
    </div>
    <div class="row mt-4" v-if="state.tasks">
      <div class="card mt-3" v-for="task in state.tasks" :key="task.id">
        <div v-if="task.closed">
          <div class="card-body p-0 muted">
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
            <div class="btn-group btn-block btn-warning mt-3" role="group" aria-label="Basic example">
              <button class="btn btn-dark" @click="toggleTask(task)">
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
        <div v-else>
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

            <button class="btn btn-dark btn-block mt-3" @click="toggleTask(task)">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
export default {
  name: 'TasksPage',
  setup() {
    const state = reactive({
      // NOTE use this to get all tasks for your rentals
      tasks: computed(() => AppState.tasks),
      dueDateToggle: false,
      creationDateToggle: false
    })
    onMounted(async() => {
      await tasksService.getAll()
    })
    return {
      state,
      async toggleTask(task) {
        await tasksService.edit(task)
        await tasksService.getAll()
      },
      async removeTask(task) {
        await tasksService.delete(task)
        await tasksService.getAll()
      },
      async sortByComplete() {
        state.tasks.sort((a, b) => a.closed === b.closed ? 0 : a ? -1 : 1)
      },
      async sortByDueDate() {
        if (state.dueDateToggle) {
          state.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          state.dueDateToggle = false
          // eslint-disable-next-line no-useless-return
          return
        } else {
          state.tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
          state.dueDateToggle = true
        }
      },
      async sortByCreationDate() {
        if (state.creationDateToggle) {
          state.tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          state.creationDateToggle = false
          // eslint-disable-next-line no-useless-return
          return
        } else {
          state.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          state.creationDateToggle = true
        }
      }
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: .8;
}
button {
  user-select: none;
}
.card {
  width: 25rem;
}
.muted {
  opacity: 0.40;
}
</style>
