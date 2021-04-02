<template>
  <div class="create-task-modal" v-if="state.viewportWidth <= 700">
    <div class="modal fade"
         id="create-task"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary border-bottom">
            <h4 class="modal-title">
              New Task
            </h4>
            <span type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </span>
          </div>

          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createTask">
              <div class="form-group">
                <input class="mb-3" type="text" placeholder="Task Title" v-model="state.task.title">
                <textarea name="task-text"
                          id="task-description"
                          cols="30"
                          rows="5"
                          placeholder="Add a Task"
                          aria-describedby="helpId"
                          v-model="state.task.description"
                          required
                >
                  </textarea>
                <small>Complete by: </small>
                <Datepicker v-model="dueDate" />
              </div>
              <div>
                <button class="btn btn-success btn-block" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="create-task-modal" v-else>
    <div class="modal fade"
         id="create-task"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary border-bottom">
            <h4 class="modal-title">
              New Task
            </h4>
            <span type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </span>
          </div>

          <div class="modal-body">
            <form class="form-inline" @submit.prevent="createTask">
              <div>
                <input class="mb-3" type="text" placeholder="Task Title" v-model="state.task.title">
              </div>
              <div>
                <textarea name="task-text"
                          id="task-description"
                          cols="30"
                          rows="5"
                          placeholder="Add a Task"
                          aria-describedby="helpId"
                          v-model="state.task.description"
                          required
                >
                  </textarea>
                <div class="form-group">
                  <small>Complete by: <Datepicker v-model="dueDate" /></small>
                </div>
                <div>
                  <button class="btn btn-success mt-3" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
export default ({
  name: 'CreateTaskModal',
  setup() {
    const dueDate = ref(new Date())
    const state = reactive({
      task: {},
      tasks: computed(() => AppState.tasks),
      rental: computed(() => AppState.rental),
      viewportWidth: window.innerWidth

    })
    onMounted(() => { window.addEventListener('resize', () => { state.viewportWidth = window.innerWidth }) })

    return {
      state,
      dueDate,
      async createTask() {
        try {
          state.task.dueDate = dueDate
          state.task.rentalId = state.rental.id
          await tasksService.createTask(state.task)
          state.task = {}
          $('#create-task').modal('hide')
          $('.modal-backdrop').remove()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
})
</script>

<style scoped>
</style>
