<template>
  <div></div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Logout',
  mounted: () => {
    store.dispatch('logout');
  },
};
</script>

<style scoped>

</style>
