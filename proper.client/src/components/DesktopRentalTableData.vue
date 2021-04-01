<template>
  <div class="desktop-rental-table-data">
    <tr>
      <td scope="row">
        Apartment Number Here
      </td>
      <td>
        <!-- {{ tenant.address }} -->
        12345 Seasame Street Boulevard Road
      </td>
      <!--TODO NULL CHECK WITH V-IF-->
      <td>
        <!-- {{ tenant.name }} -->
        Steve from Minecraft
      </td>
      <td>
        <!-- {{ tenant.primarycontact }} -->
        55512345678
      </td>
      <td>
        Avaliable? <!-- bool-->
      </td>
      <td>
        <button class="btn btn-success">
          E-Mail Tenant
        </button>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'DesktopRentalTableData',
  props: {
    tenant: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
