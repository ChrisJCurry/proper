<template>
  <tr>
    <td scope="row">
      {{ rental.address.aptNum }}
    </td>
    <td>
      {{ rental.address.street }}
    </td>
    <!--TODO NULL CHECK WITH V-IF-->
    <td>
      {{ rental.tenant[0] }}
    </td>
    <td>
      {{ rental.tenant[0] }}
    </td>
    <td v-if="rental.tenant">
      <span v-if="!rental.closed">
        <h6 class="text-success">OCCUPIED</h6>
      </span>
      <span v-if="rental.closed">
        <h6 class="text-warning">UNOCCUPIED</h6>
      </span>
    </td>
    <td>
      <button @click="nodemailerstuff" class="btn btn-success">
        E-Mail Tenant
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'DesktopRentalTableData',
  props: {
    rental: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
