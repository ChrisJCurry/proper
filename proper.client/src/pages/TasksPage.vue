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
      <div class="col-2 offset-1 text-center border border-dark">
        <button type="button" class="btn btn-dark" @click="sortByComplete">
          Completed
        </button>
      </div>
      <div class="col-2 text-center border border-dark">
        <button type="button" class="btn btn-dark" @click="sortByDueDate">
          Due Date
        </button>
      </div>
      <div class="col-3 text-center border border-dark">
        <button type="button" class="btn btn-dark" @click="sortByCreationDate">
          Created Date
        </button>
      </div>
    </div>
    <div class="row" v-if="state.tasks">
      <div class="col-12 mt-2" v-for="task in state.tasks" :key="task.id">
        <div v-if="task.closed">
          <div class="card overlay">
            <div class="card-body shadow">
              <div class="row">
                <div class="col-1">
                  <button class="btn btn-dark" @click="toggleTask(task)">
                    <h6 class="m-0">
                      reactivate
                    </h6>
                  </button>
                </div>
                <div class="col-3">
                  <div class="card-text text-right">
                    <h6>{{ task.title }}: </h6>
                  </div>
                </div>
                <div class="col-7">
                  <div class="card-text">
                    <h6>{{ task.description }}</h6>
                  </div>
                </div>
                <div class="col-1">
                  <button class="btn btn-warning" type="button" @click="removeTask(task)">
                    x
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center">
                  <div class="col-12">
                    <small>Created: {{ new Date(task.createdAt).toLocaleString() }}</small>
                  </div>
                </div>
              </div>
              <div class="row text-center">
                <div class="col-6">
                  <small>{{ task.dueDate }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card">
            <div class="card-body shadow">
              <div class="row">
                <div class="col-1">
                  <button class="btn btn-success" @click="toggleTask(task)">
                    <h6 class="m-0">
                      complete
                    </h6>
                  </button>
                </div>
                <div class="col-3">
                  <div class="card-text text-right">
                    <h6>{{ task.title }}: </h6>
                  </div>
                </div>
                <div class="col-8">
                  <div class="card-text">
                    <h6>{{ task.description }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-center">
                  <div class="col-12">
                    <small>Created: {{ new Date(task.createdAt).toLocaleString() }}</small>
                  </div>
                </div>
              </div>
              <div class="row text-center">
                <div class="col-6">
                  <small>{{ task.dueDate }}</small>
                </div>
              </div>
            </div>
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
</style>
