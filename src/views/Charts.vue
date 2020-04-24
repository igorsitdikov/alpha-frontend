<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-layout wrap>
          <v-flex xs12>
            <v-combobox multiple
                        v-model="keywords"
                        label="Keywords"
                        append-icon
                        chips
                        deletable-chips
                        class="tag-input"
                        :search-input.sync="search"
                        @keyup.tab="updateTags"
                        @paste="updateTags">
            </v-combobox>
            <v-btn @click="drawChart">
              <v-icon>mdi-reload</v-icon>
              Redraw chart
            </v-btn>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <template v-if="dataLoaded">
          <Chart v-bind:charts="chartData"></Chart>
        </template>
        <template v-if="loading">
          <loading></loading>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from '../components/Charts/Chart.vue';
import Loading from '../components/Loader/Loading.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const chartsRepository = RepositoryFactory.get('charts');

export default {
  name: 'Charts',
  components: {
    Chart,
    Loading,
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
    this.$root.$on('showChart', async () => {
      await this.drawChart();
    });
  },
  beforeDestroy() {
    this.$root.$off('showChart', async () => {
      await this.drawChart();
    });
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
