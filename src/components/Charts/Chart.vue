<template>
  <line-chart style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
              :height="550"
  >
  </line-chart>
</template>

<script>
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
import utils from '@/components/Charts/utils';

export default {
  name: 'Chart',
  components: {
    LineChart,
  },
  props: { charts: Object },
  data: () => ({
    htmlLegend: null,
    bigLineChart: {
      allData: [
        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        [1, 1, 0, 0, 1, 2, 83],
        [1, 0, 2, 2, 4, 5, 14],
      ],
      activeIndex: 0,
      chartData: null,
      extraOptions: chartConfigs.purpleChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
      categories: [],
    },
    defaultAttributesDataset: {
      fill: true,
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBorderColor: 'rgba(255,255,255,0)',
      pointBorderWidth: 20,
      height: 550,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
    },
  }),
  mounted() {
    this.initBigChart(this.charts);
  },
  methods: {
    initBigChart(testObjectChartData) {
      // eslint-disable-next-line no-param-reassign
      testObjectChartData.datasets = testObjectChartData.datasets.map((dataset) => {
        const color = utils.randomColor(0.8);
        return ({
          ...this.defaultAttributesDataset,
          borderColor: color,
          pointBackgroundColor: color,
          pointHoverBackgroundColor: color,
          ...dataset,
        });
      });
      this.bigLineChart.chartData = testObjectChartData;
      this.$refs.bigChart.updateGradients(testObjectChartData);
      this.bigLineChart.chartData = testObjectChartData;
      // this.bigLineChart.activeIndex = index;
    },
  },
};
</script>

<style scoped>

</style>
