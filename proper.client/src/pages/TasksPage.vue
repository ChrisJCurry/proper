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

    <div class="row" v-if="state.tasks">
      <div class="col-12 mt-2" v-for="task in state.tasks" :key="task.id">
        <div class="card">
          <div class="card-body shadow">
            <div class="row">
              <div class="col-3">
                <div class="card-text text-right">
                  <h6>{{ task.title }}: </h6>
                </div>
              </div>
              <div class="col-9">
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
                <button class="btn btn-secondary">
                  <h6 class="m-0">
                    complete
                  </h6>
                </button>
              </div>
              <div class="col-6">
                <small>{{ task.dueDate }}</small>
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
import { rentalsService } from '../services/RentalsService'
import { tasksService } from '../services/TasksService'
export default {
  name: 'TasksPage',
  setup() {
    const state = reactive({
      rentals: computed(() => AppState.rentals),
      // NOTE use this to get all tasks for your rentals
      tasks: computed(() => AppState.tasks)
    })
    onMounted(async() => {
      await rentalsService.getAll()
      await tasksService.getAll()
    })
    return {
      state
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
</style>
