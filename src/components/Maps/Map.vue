<template>
  <div>
    <messages-sidebar :toggle="visible" :messages="texts"></messages-sidebar>
    <v-card
      class="mx-auto"
      :raised=true
      :loading="loading"
      light>
      <v-card-title>Map</v-card-title>
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="z-index: 0; height: 80vh;"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-icon-default :image-path="pathToIcons"/>
        <l-tile-layer
          :url="url"
          :attribution="attribution"
        />
        <div v-for="(mark, index) of coordinatesGis" :key="index">
          <l-marker :lat-lng="mark.latLng"
                    @click="innerClick(mark.entries, index)"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="sidebar-1">
          </l-marker>
        </div>
      </l-map>
    </v-card>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LIconDefault,
} from 'vue2-leaflet';
import MessagesSidebar from '../Sidebars/MessagesSidebar.vue';

export default {
  name: 'Map',
  components: {
    MessagesSidebar,
    LMap,
    LTileLayer,
    LMarker,
    LIconDefault,
  },
  data() {
    return {
      zoom: 2,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 2,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      pathToIcons: '/images/',
      showMap: true,
      texts: '',
      // loading: false,
      currentMarker: 0,
      visible: false,
    };
  },
  props: {
    coordinatesGis: Array,
    loading: Boolean,
  },
  beforeDestroy() {
    this.$root.$off('hideMessageSidebar');
  },
  mounted() {
    this.$root.$on('hideMessageSidebar', () => {
      this.visible = false;
    });
  },
  methods: {
    getDateString(date) {
      return date.toJSON()
        .split('T')[0];
    },
    formatDate(dStr) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const todayStr = this.getDateString(today);
      const pieces = dStr.split('T');
      let formattedDate = pieces[0];
      if (pieces[0] === todayStr) {
        formattedDate = `${formattedDate} ${pieces[1].split('.')[0]}`;
      }
      return formattedDate;
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick(entries, index) {
      this.texts = entries;
      if (this.currentMarker === index && this.visible) {
        this.visible = !this.visible;
      } else {
        this.visible = true;
      }
      this.currentMarker = index;
    },
  },
};
</script>

<style scoped>
  @import "~leaflet/dist/leaflet.css";
</style>
