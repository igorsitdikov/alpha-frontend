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
          color="primary"
          dark
          small
          absolute
          center
          left
          fab
          @click="changeDialogState"
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
    changeDialogState() {
      this.$store.dispatch('toggleProjectDialog');
    },
    async deleteObject() {
      const id = this.$store.state.login.objectId;
      await objectsRepository.delete(id);
    },
  },
};
</script>

<style scoped>

</style>
