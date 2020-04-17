<template>
  <div>
    <div class="row test">
      <div class="proj-wrapper col-md-2 ">
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
    </div>
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
    projects: [],
    tree: [],
    index: 0,
    path: [],
    parentId: 'null',
    userId: 'null',
    projectsIds: [],
    treeData: {},
    nodes: [],
    objects: [],
    entries: [],
    tst: '',
    contextMenuIsVisible: false,
    lastEvent: 'No last event',
    selectedNodesTitle: '',
    selectedId: '',
    newObjShow: false,
    filters: {
      search: {
        query: '',
        similar: '',
        notContains: '',
      },
      place: '',
      date: {
        from: '',
        to: '',
      },
    },
    params: {
      data: [
        ['Brief', 'Date', 'URLS'],
      ],
      header: 'row',
      border: true,
      stripe: false,
      rowHeight: 100,
      // wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      textOverflow: 'ellipsis',
      // highlight: { column: [-2] },
      // highlightedColor: 'rgb(243, 235, 200)',
      // height: 380,
      pagination: true,
      enableSearch: true,
      pageSize: 7,
      pageSizes: [5, 10, 20, 50],
    },
  }),
  async mounted() {
    this.userId = this.$store.state.userId;
    this.newObjShow = true;
    window.slVueTree = this.$refs.slVueTree;
    await this.redraw();
  },
  methods: {
    async fetch() {
      if (this.parentId !== 'null') {
        await objectRepository.fetch(this.parentId);
        await this.redraw();
        // this.$api.object.fetch(this.parentId).then(() => {
        //   this.redraw();
        // });
      }
    },
    async redraw() {
      const { data } = await apiRepository.get(this.userId);
      this.nodes = [];
      this.nodes = data.tree;
      console.log(data);
    },
    removeNode() {
      this.contextMenuIsVisible = false;
      const $slVueTree = this.$refs.slVueTree;
      const paths = $slVueTree.getSelected()
        .map((node) => node.path);
      $slVueTree.remove(paths);
      console.log(this.selectedId);
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
      this.parentId = node.data.id;
      // eslint-disable-next-line no-underscore-dangle
      this.objectId = node._id;
      console.log(this.objectId);
      console.log(this.parentId);
      if (node.isLeaf) {
        this.newObjShow = false;
        this.selectedNodesTitle = '';
        this.clean();
        this.params.data.push(['Brief', 'Date', 'URLS']);
        node.data.entries.forEach((entrie) => {
          this.params.data.push(
            [entrie.brief, entrie.date, entrie.urls],
          );
        });
      } else {
        this.clean();
        this.selectedNodesTitle = node.title;
        this.newObjShow = true;
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
