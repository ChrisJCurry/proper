<template>
  <div class="rental-info-modal">
    <div class="modal fade"
         id="rental-info"
         tabindex="-1"
         role="dialog"
         aria-labelledby="rentalInfo"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content text-between">
          <div class="modal-header">
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="accordion" id="tenantInfo">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                    >
                      Collapsible Group Item #1
                    </button>
                  </h2>
                </div>

                <!-- <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#tenantInfo">
                  <TenantInfo />
                </div> -->
              </div>
            </div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'RentalInfoModal',
  setup() {
    const state = reactive({
      tenant: computed(() => AppState.rental),
      rental: computed(() => AppState.rental)
    })
    return {
      state,
      closeModal() {
        $('#rental-info').modal('hide')
        $('.modal-backdrop').remove()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
