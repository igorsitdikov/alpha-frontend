<template>
  <div class="charts">
    <h1>This is a chart page</h1>
    <button @click="setObjectIdToStore">Set Object Id</button>
    <button @click="drawChart">Draw Chart</button>
    <p class="text-left">Type word and press enter:</p>
    <input-tag v-model="keywords"></input-tag>
    <template v-if="dataLoaded">
      <Chart v-bind:charts="chartData"></Chart>
    </template>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag';
import Chart from '../components/Charts/Chart.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const chartsRepository = RepositoryFactory.get('charts');

export default {
  name: 'Charts',
  components: {
    Chart,
    InputTag,
  },
  data: () => ({
    dataLoaded: false,
    chartData: null,
    objectId: '',
    keywords: ['covid-19', 'coronavirus', 'usa', 'china'],
  }),
  methods: {
    setObjectIdToStore() {
      // 5e97f64afbf8702e37904a34  5e96b8ad45d59e192c9a7caa
      this.$store.commit('setObjectId', '5e96b8ad45d59e192c9a7caa');
    },
    async drawChart() {
      this.dataLoaded = false;
      this.objectId = this.$store.state.objectId;
      const { data } = await chartsRepository.show(this.objectId, this.keywords);
      this.chartData = data;
      this.dataLoaded = true;
    },
  },
};
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
  .text-left {
    text-align: left;
    margin-bottom: 0;
  }
</style>
