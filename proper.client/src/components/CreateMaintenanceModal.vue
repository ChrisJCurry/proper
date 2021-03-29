<template>
  <div class="create-maintenance-modal">
    <div class="modal fade"
         id="create-maintenance"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <span type="button" class="close py-4" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </span>
                  <h3 class="modal-title">
                    New Maintenance Task!
                  </h3>
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
                  <div class="col-12">
                    <textarea name="task-text"
                              id="task-description"
                              cols="35"
                              rows="5"
                              placeholder="Add a task"
                              aria-describedby="helpId"
                              v-model="state.task.body"
                              required
                    >
                  </textarea>
                  </div>
                </div>
                <div class="row mt-2">
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
import { reactive, computed } from 'vue'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
import { maintenancesService } from '../services/MaintenancesService'
export default ({
  name: 'CreateMaintenanceModal',
  setup() {
    const state = reactive({
      task: {},
      rental: computed(() => AppState.rental)
    })
    return {
      state,

      async createTask() {
        try {
          state.maintenances.rental = state.rental
          await maintenancesService.createTask(state.task)
          state.task = {}
          $('#create-maintenance').modal('hide')
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
