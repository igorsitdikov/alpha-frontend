<template>
  <v-navigation-drawer
    v-model="$store.state.view.projectSidebarOpen"
    absolute
    right
  >
    <v-toolbar extended>
      <v-list-item-title>Projects</v-list-item-title>
      <template v-slot:extension>
        <v-btn
          color="pink"
          dark
          small
          absolute
          center
          left
          fab
          @click="dialog = !dialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <folder-tree-view></folder-tree-view>

  </v-navigation-drawer>
</template>

<script>
import FolderTreeView from '../Projects/FolderTreeView.vue';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'ProjectsSidebar',
  components: {
    FolderTreeView,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    async deleteObject() {
      const id = this.$store.state.login.objectId;
      await objectsRepository.delete(id);
    },
  },
};
</script>

<style scoped>

</style>
