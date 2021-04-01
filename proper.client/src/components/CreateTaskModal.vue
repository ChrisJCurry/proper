<template>
  <div class="create-task-modal">
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
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <span type="button" class="close py-4" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </span>
                  <h4 class="modal-title">
                    New Task
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-body">
            <div class="container">
              <form class="form-inline" @submit.prevent="createTask">
                <div class="form-group">
                </div>
                <div class="row">
                  <div class="col-6 ml-1">
                    <input type="text" placeholder="Task Title" v-model="state.task.title">
                  </div>
                  <Datepicker v-model="dueDate" />
                </div>
                <div class="row mt-3">
                  <div class="col-12">
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
                    <div class="row">
                      <div class="col-6">
                        <small>Due: </small>
                        <Datepicker v-model="dueDate" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 text-center">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                  </button>
                </div>

                <div class="col-6 text-center">
                  <button class="btn btn-success" type="submit">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
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
      rental: computed(() => AppState.rental)
    })
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
