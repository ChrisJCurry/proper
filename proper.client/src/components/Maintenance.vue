<template>
  <div class="row">
    <div class="col-12 maintenance my-1" v-if="state.rental">
      <div v-for="task in maintenance.tasks" :key="task._id">
        <div class="row card p-0">
          <div class="col-12 card-title mt-2 text-center">
            <h6 class="p-0" v-if="state.rental.address">
              {{ state.rental.address.street }}
            </h6>
            <div class="row card-body py-0">
              <div class="col-12">
                <h4>{{ task.title }}</h4>
              </div>
            </div>

            <div class="row py-0">
              <div class="col-9">
                <h6>
                  {{ task.description }}
                </h6>
              </div>
              <div class="col-2">
                <button class="p-0 btn btn-primary text-dark">
                  <small>close</small>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-right py-0">
                <small>
                  created: {{ new Date(task.createdAt).toLocaleString() }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { rentalsService } from '../services/RentalsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Maintenance',
  props: {
    maintenance: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      route: useRoute(),
      rental: computed(() => AppState.rental),
      tasks: computed(() => AppState.tasks),
      loading: true
    })
    onBeforeMount(async() => {
      logger.log('hey')
      await rentalsService.getById(props.maintenance.rentalId)
    })
    onMounted(() => {
      state.loading = false
    })
    return {
      state,
      route
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.maintenance{
  color: dark
}
</style>
