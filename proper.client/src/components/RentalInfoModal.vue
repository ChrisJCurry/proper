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
                <div class="card-header bg-dark" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-block btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                    >
                      Tenant Info
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#tenantInfo">
                  <div class="card-body">
                    <p>Tenant Name: {{ state.rental.tenant.name }}</p>
                    <p>Primary Contact: {{ state.rental.tenant.phoneNum }}</p>
                  </div>
                </div>
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
import { rentalsService } from '../services/RentalsService'
export default {
  name: 'RentalInfoModal',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    rental: { type: Object }
  },
  setup(props) {
    const state = reactive({
      rental: computed(() => AppState.rental)
    })
    return {
      state,
      async getAllTenantsByRentalId(id) {
        await rentalsService.getTenantsByRentalId(id)
      },
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
