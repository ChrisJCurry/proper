<template>
  <div class="rental-info-modal">
    <div class="modal fade"
         id="rental-info-modal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="rentalInfo"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content text-between">
          <div class="modal-header bg-primary">
            <h4>
              Rental Info
            </h4>
            <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="accordion" id="tenantInfo">
              <!-- ACCORDION ONE -->
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

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne">
                  <div v-for="tenant in state.rental.tenants" :key="tenant.id">
                    <div class="card-body">
                      <p>Tenant Name: {{ tenant.name }}</p>
                      <p>Primary Contact: {{ tenant.phoneNum }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ACCORDION TWO -->
              <div class="card">
                <div class="card-header bg-dark" id="headingTwo">
                  <h2 class="mb-0">
                    <button class="btn btn-block btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="true"
                            aria-controls="collapseTwo"
                    >
                      Tenant Info
                    </button>
                  </h2>
                </div>

                <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#tenantInfo">
                  <div v-for="tenant in state.rental.tenants" :key="tenant.id">
                    <div class="card-body">
                      <p>Tenant Name: {{ tenant.name }}</p>
                      <p>Primary Contact: {{ tenant.phoneNum }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ACCORDION TWO ENDS -->
            </div>
            <!-- ACCORDION ENDS -->
            <div class="modal-footer">
            </div>
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
