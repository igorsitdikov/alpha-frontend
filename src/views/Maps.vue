<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <Map :loading="!(gisData.length > 0)" :coordinates-gis="gisData"></Map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { latLng } from 'leaflet';
import Map from '../components/Maps/Map.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const gisRepository = RepositoryFactory.get('gis');

export default {
  name: 'Maps',
  components: {
    Map,
  },
  data: () => ({
    gisData: [],
  }),
  methods: {
    async drawMarkers() {
      const { objectId } = this.$store.getters;
      const { data } = await gisRepository.getByObjectId(objectId);
      data.forEach((el) => {
        if (el.latLng[0] != null && el.latLng[1] != null) {
          this.gisData.push({
            entries: el.entries,
            latLng: latLng(parseFloat(el.latLng[0]), parseFloat(el.latLng[1])),
          });
        }
      });
      this.gisData = this.gisData.slice(-30);
    },
  },
  async mounted() {
    await this.drawMarkers();
    this.$root.$on('showMap', async () => {
      await this.drawMarkers();
    });
  },
  beforeDestroy() {
    this.$root.$off('showMap', async () => {
      await this.drawMarkers();
    });
  },
};
</script>

<style scoped>

</style>
