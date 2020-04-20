<template>
  <div>
    <h3>News</h3>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <table-news></table-news>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TableNews from '../components/Projects/TableNews.vue';

export default {
  name: 'News',
  components: { TableNews },
  data: () => ({
  }),
};
</script>

<style scoped>

</style>
