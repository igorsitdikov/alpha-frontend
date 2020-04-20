<template>
  <div class="charts">
    <h1>This is a chart page</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="9">
          <b-form-tags input-id="tags-basic"
                       separator=" "
                       remove-on-delete
                       placeholder="Enter new keywords separated by space"
                       v-model="keywords" class="mb-2"></b-form-tags>
        </b-col>
        <b-col cols="3">
          <b-button @click="drawChart">
            <b-icon icon="arrow-repeat"></b-icon>
            Redraw chart
          </b-button>
        </b-col>
      </b-row>
      <b-row class="chart-wrapper">
        <b-col cols="12">
          <template v-if="dataLoaded">
            <Chart v-bind:charts="chartData"></Chart>
          </template>
          <template v-if="loading">
            <p>Loading... Please wait</p>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
          </template>
        </b-col>
      </b-row>
    </b-container>
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
    objectId: '',
    keywords: ['covid-19', 'coronavirus', 'usa', 'china'],
    loading: false,
  }),
  methods: {
    async drawChart() {
      this.dataLoaded = false;
      this.loading = true;
      this.objectId = this.$store.state.objectId;
      const { data } = await chartsRepository.show(this.objectId, this.keywords);
      this.chartData = data;
      this.loading = false;
      this.dataLoaded = true;
    },
  },
  async mounted() {
    await this.drawChart();
  },
};
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
  .chart-wrapper {
    margin-top: 50px;
  }
</style>
