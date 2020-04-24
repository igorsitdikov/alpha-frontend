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
            <loading></loading>
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Chart from '../components/Charts/Chart.vue';
import Loading from '../components/Loader/Loading.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const chartsRepository = RepositoryFactory.get('charts');

export default {
  name: 'Charts',
  components: {
    Chart, Loading,
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
      this.objectId = this.$store.state.login.objectId;
      try {
        const { data } = await chartsRepository.show(this.objectId, this.keywords);
        this.chartData = data;
        this.dataLoaded = true;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.drawChart();
    this.$root.$on('showChart', async () => { await this.drawChart(); });
  },
  beforeDestroy() {
    this.$root.$off('showChart', async () => { await this.drawChart(); });
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
