<template>
  <v-treeview
    v-model="active"
    :items="nodes"
    return-object
    :dense="dense"
    :selectable="selectable"
    :activatable="activatable"
    :hoverable="hoverable"
    :selection-type="selectionType"
    :color="color"
    :shaped="shaped"
    :rounded="rounded"
    :active="active"
    @update:active="onUpdate"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.isLeaf">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ 'mdi-file' }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';

const apiRepository = RepositoryFactory.get('api');
const objectRepository = RepositoryFactory.get('objects');

export default {
  name: 'FolderTreeView',
  data: () => ({
    objectId: 'null',
    userId: 'null',
    nodes: [],
    active: [],
    contextMenuIsVisible: false,
    selectedId: '',
    dense: false,
    selectable: false,
    activatable: true,
    selectionType: 'independent',
    hoverable: false,
    openOnClick: true,
    shaped: false,
    rounded: false,
    color: 'primary',
  }),
  async mounted() {
    this.userId = this.$store.state.login.userId;
    this.$nextTick(async () => this.redraw());
    this.$root.$on('showTree', async () => {
      await this.redraw();
    });
  },
  beforeDestroy() {
    this.$root.$off('showTree', async () => {
      await this.redraw();
    });
  },
  methods: {
    onUpdate(item) {
      if (item.length > 0) {
        const node = item[item.length - 1];
        this.showEntries(node);
      }
    },
    async fetch() {
      if (this.objectId !== 'null') {
        await objectRepository.fetch(this.objectId);
        await this.redraw();
      }
    },
    async redraw() {
      const { data } = await apiRepository.get(this.userId);
      this.nodes = [];
      this.nodes = data.tree;
    },
    showEntries(node) {
      this.objectId = node.id;
      this.$store.commit('setObject', node);
      this.$store.commit('setIsProject', !node.isLeaf);
      if (node.isLeaf && this.objectId !== this.$store.state.login.objectId) {
        this.$store.commit('setObjectId', this.objectId);
        switch (this.$route.name) {
          case 'News':
            this.$root.$emit('showNews', this.objectId);
            break;
          case 'Charts':
            this.$root.$emit('showChart');
            break;
          case 'Maps':
            this.$root.$emit('showMap');
            break;
          default:
            break;
        }
      }
    },
    clean() {
      this.entries = [];
      this.params.data = [];
    },
  },
};
</script>

<style scoped>
  @import url("https://use.fontawesome.com/releases/v5.0.8/css/all.css");
</style>
