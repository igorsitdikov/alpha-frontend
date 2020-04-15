<template>
  <div class="charts">
    <h1>This is a chart page</h1>
    <button @click="drawChart">Draw Chart</button>
    <template v-if="dataLoaded">
      <Chart v-bind:charts="chartData"></Chart>
    </template>
  </div>
</template>

<script>
import Chart from '../components/Charts/Chart.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const chartsRepository = RepositoryFactory.get('charts');

export default {
  name: 'Charts',
  components: {
    Chart,
  },
  data: () => ({
    dataLoaded: false,
    chartData: null,
    objectId: '5e96b8ad45d59e192c9a7caa',
    keywords: ['covid-19', 'coronavirus', 'usa', 'china'],
  }),
  methods: {
    async drawChart() {
      const { data } = await chartsRepository.show(this.objectId, this.keywords);
      this.chartData = data;
      this.dataLoaded = true;
    },
  },
};
</script>

<style scoped>

</style>
