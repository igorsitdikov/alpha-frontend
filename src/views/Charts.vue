<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Search by keywords</v-card-title>
          <v-card-text>
            <v-combobox multiple
                        v-model="keywords"
                        label="Keywords"
                        placeholder="Enter new keyword and press Tab or Enter"
                        chips
                        deletable-chips
                        class="tag-input">
            </v-combobox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          :loading="loading"
          :raised=true
          :max-height="750"
        >
          <v-card-title>Chart</v-card-title>
          <v-card-actions>
            <v-btn
              color="warning"
              @click="drawChart">
              <v-icon>mdi-reload</v-icon>
              Redraw chart
            </v-btn>
          </v-card-actions>
          <template >
            <Chart v-if="dataLoaded" v-bind:charts="chartData"></Chart>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from '@/components/Charts/Chart.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const chartsRepository = RepositoryFactory.get('charts');

export default {
  name: 'Charts',
  components: {
    Chart,
  },
  data: () => ({
    dataLoaded: false,
    chartData: {
      labels: [],
      datasets: [],
    },
    objectId: '',
    // keywords: ['covid-19', 'coronavirus', 'usa', 'china'],
    keywords: [],
    loading: false,
    search: '',
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
