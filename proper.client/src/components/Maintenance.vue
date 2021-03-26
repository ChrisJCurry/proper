<template>
  <div class="maintenance border border-primary my-5">
    <div v-for="task in maintenance.tasks" :key="task._id">
      {{ task.title }} {{ new Date(task.createdAt).toLocaleString() }}
      <br>
      {{ task.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maintenance',
  props: {
    maintenance: {
      type: Object, required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
