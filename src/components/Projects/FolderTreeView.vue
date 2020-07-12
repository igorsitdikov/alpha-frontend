<template>
  <div>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Object by name"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
    </v-sheet>
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
      :filter="filter"
      :search="search"
      @update:active="onUpdate"
    >
      <template slot="append" slot-scope="{ item }">
        <template v-if="!item.isLeaf">
          <v-btn icon small color="red" @click="addChildProject(item);">
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
          <v-btn icon small color="green" @click="addChildObject(item);">
            <v-icon>mdi-file-plus</v-icon>
          </v-btn>
        </template>
        <v-btn icon small color="black" @click="deleteObject(item);">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.isLeaf">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ 'mdi-file' }}
        </v-icon>
      </template>
    </v-treeview>
    <v-btn icon x-large color="red" @click="addChildProject(null);">
      <v-icon>mdi-folder-plus</v-icon>
    </v-btn>
    <v-btn icon x-large color="green" @click="addChildObject(null);">
      <v-icon>mdi-file-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';

const apiRepository = RepositoryFactory.get('api');
const objectRepository = RepositoryFactory.get('objects');

export default {
  name: 'FolderTreeView',
  data: () => ({
    search: null,
    caseSensitive: false,
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
    this.userId = this.$store.getters.userId;
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
    addChildObject(item) {
      this.setObjectIdToStore(item);
      this.$store.dispatch('toggleObjectDialog');
    },
    addChildProject(item) {
      this.setObjectIdToStore(item);
      this.$store.dispatch('toggleProjectDialog');
    },
    setObjectIdToStore(item) {
      const projectId = this.getId(item);
      this.$store.commit('setObjectId', projectId);
    },
    getId(object) {
      return object === null ? null : object.id;
    },
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
      // this.$store.commit('setObject', node);
      // this.$store.commit('setIsProject', !node.isLeaf);
      if (node.isLeaf && this.objectId !== this.$store.getters.objectId) {
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
    async deleteObject(item) {
      const { id } = item;
      await objectRepository.delete(id);
      this.$root.$emit('showTree');
      this.dialog = false;
    },
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },
};
</script>

<style scoped>
  @import url("https://use.fontawesome.com/releases/v5.0.8/css/all.css");
</style>
