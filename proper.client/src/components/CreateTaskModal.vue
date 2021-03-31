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
                  <div class="col">
                    <input type="text" placeholder="Task Title" v-model="state.task.title">
                  </div>
                  <Datepicker v-model="picked" />
                </div>
                <div class="row mt-3">
                  <div class="col-12">
                    <textarea name="task-text"
                              id="task-description"
                              cols="51"
                              rows="5"
                              placeholder="Add a Task"
                              aria-describedby="helpId"
                              v-model="state.task.description"
                              required
                    >
                  </textarea>
                  </div>
                </div>
                <div class="row mt-3">
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
import { rentalsService } from '../services/RentalsService'
export default ({
  name: 'CreateTaskModal',
  setup() {
    const picked = ref(new Date())
    const state = reactive({
      task: {},
      rental: computed(() => AppState.rental)
    })
    return {
      state,
      picked,
      async createTask() {
        try {
          state.rental.tasks.push(state.task)
          await rentalsService.edit(state.rental)
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
