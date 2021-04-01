<template>
  <div class="desktop-rental-table-data">
    <tr>
      <th scope="row">
        Apartment Number Here
      </th>
      <td>
        {{ tenant.address }}
      </td>
      <!--TODO NULL CHECK WITH V-IF-->
      <td>
        {{ tenant.name }}
      </td>
      <td>
        {{ tenant.primarycontact }}
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
