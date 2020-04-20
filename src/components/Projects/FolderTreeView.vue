<template>
  <div>
    <sl-vue-tree
      v-model="nodes"
      ref="slVueTree"
      :allowMultiselect="false"
      @nodeclick="showEntries($event)"
      @nodecontextmenu="showContextMenu"
      @nodedblclick="fetch"
    >
      <template slot="title" slot-scope="{ node }">
      <span class="item-icon">
        <i class="fa fa-file" v-if="node.isLeaf"></i>
      </span>
        {{ node.title }}
      </template>
      <template slot="toggle" slot-scope="{ node }">
      <span v-if="!node.isLeaf">
        <i v-if="!node.isExpanded" class="fa fa-folder"></i>
        <i v-if="node.isExpanded" class="fa fa-folder-open"></i>
      </span>
      </template>
      <slot name="context-menu">
        test
      </slot>
    </sl-vue-tree>
  </div>
</template>

<script>
import SlVueTree from 'sl-vue-tree';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const apiRepository = RepositoryFactory.get('api');
const objectRepository = RepositoryFactory.get('objects');

export default {
  name: 'FolderTreeView',
  components: {
    SlVueTree,
  },
  data: () => ({
    objectId: 'null',
    userId: 'null',
    nodes: [],
    contextMenuIsVisible: false,
    selectedId: '',
  }),
  async mounted() {
    this.userId = this.$store.state.userId;
    // this.newObjShow = true;
    window.slVueTree = this.$refs.slVueTree;
    await this.redraw();
  },
  methods: {
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
    removeNode() {
      this.contextMenuIsVisible = false;
      const $slVueTree = this.$refs.slVueTree;
      const paths = $slVueTree.getSelected()
        .map((node) => node.path);
      $slVueTree.remove(paths);
      // console.log(this.selectedId);
    },
    showContextMenu(node, event) {
      event.preventDefault();
      this.contextMenuIsVisible = true;
      const $contextMenu = this.$refs.contextmenu;
      $contextMenu.style.left = `${event.clientX}px`;
      $contextMenu.style.top = `${event.clientY}px`;
      this.selectedId = node.data.id;
    },
    showEntries(node) {
      this.objectId = node.data.id;
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
  @import "~sl-vue-tree/dist/sl-vue-tree-dark.css";
  @import url("https://use.fontawesome.com/releases/v5.0.8/css/all.css");

  ul {
    margin: 0;
    padding: 0;
  }

  .folders > li > button {
    display: none !important;
  }

  .proj-wrapper {
    display: flex;
    justify-content: space-between;
    /*flex-flow: column;*/
  }

  .sl-vue-tree {
    width: 300px;
  }

  .objects-wrapper {
    width: 100%;
    /*height: 100vh;*/
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .objects {
    background-color: #1a7751;
    width: 100%;
  }

  .entries li {
    border-bottom: 2px solid #0d2e42;
    color: #bce8f1 !important;
    /*border-top: 2px solid #0d2e42;*/
  }

  .v-table-dynamic {
    /*color: white !important;*/
  }

  .v-table-dynamic .v-table .vue-scroll-view .vue-scrollbar > .v-table-row:hover {
    background-color: #2a3844 !important;
  }

  .entries li p {
    text-align: left;
    /*margin: 20px;*/
  }

  .contextmenu {
    position: absolute;
    background-color: white;
    color: black;
    border-radius: 2px;
    cursor: pointer;
  }

  .contextmenu > div {
    padding: 10px;
  }

  .contextmenu > div:hover {
    background-color: rgba(100, 100, 255, 0.5);
  }

  body {
    background: #050d12;
    font-family: Arial;
    color: rgba(255, 255, 255, 0.5);
  }

  a {
    color: #bbb;
  }

  .row {
    display: flex;
    margin-bottom: 10px;
  }

  .contextmenu {
    position: absolute;
    background-color: white;
    color: black;
    border-radius: 2px;
    cursor: pointer;
  }

  .contextmenu > div {
    padding: 10px;
  }

  .contextmenu > div:hover {
    background-color: rgba(100, 100, 255, 0.5);
  }

  .last-event {
    color: white;
    background-color: rgba(100, 100, 255, 0.5);
    padding: 10px;
    border-radius: 2px;
  }

  .tree-container {
    flex-grow: 1;
  }

  .view-projects, .test {
    /*height: 100vh;*/
    /*overflow-y: auto;*/
  }

  .sl-vue-tree.sl-vue-tree-root {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    /*height: 300px;*/
  }

  .json-preview {
    flex-grow: 1;
    margin-left: 10px;
    background-color: #13242d;
    border: 1px solid black;
    padding: 10px;
  }

  .sl-vue-tree-gap {
    width: 15px !important;
  }

  .item-icon {
    /*display: contents;*/
    /*text-align: left;*/
    /*width: 20px;*/
  }

  .v-table-row {
    background-color: #fff !important;
  }
</style>
