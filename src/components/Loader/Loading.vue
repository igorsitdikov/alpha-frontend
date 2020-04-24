<template>
  <div><p>Loading... Please wait</p>
    <v-progress-circular
      indeterminate
      color="green"
    ></v-progress-circular>
    <v-progress-circular
      indeterminate
      color="green"
    ></v-progress-circular>
    <v-progress-circular
      indeterminate
      color="green"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>
