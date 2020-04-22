<template>
  <div>
    <v-treeview
      v-model="active"
      :items="nodes"
      return-object
      :dense="dense"
      :selectable="selectable"
      :activatable="activatable"
      :hoverable="hoverable"
      :selection-type="selectionType"
      :open-on-click="openOnClick"
      :color="color"
      :shaped="shaped"
      :rounded="rounded"
      :active="active"
      @update:active="onUpdate"
      @update:open="onUpdate"
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.isLeaf" @click="onUpdate(item)">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else @click="onUpdate(item)">
          {{ 'mdi-file' }}
        </v-icon>
      </template>
    </v-treeview>
  </div>
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
    this.userId = this.$store.state.userId;
    await this.redraw();
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
      this.$root.$emit('showNews', this.objectId);
      this.$store.commit('setObjectId', this.objectId);
      this.$store.commit('setIsProject', !node.isLeaf);
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
