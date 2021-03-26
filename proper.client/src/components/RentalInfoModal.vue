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
            <div class="accordion" id="accordionExample">
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

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <TenantInfo />
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
export default {
  name: 'RentalInfoModal',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
