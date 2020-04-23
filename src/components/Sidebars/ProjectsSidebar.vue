<template>
  <v-navigation-drawer
    v-model="$store.state.projectSidebarOpen"
    absolute
    right
  >
    <!--      <v-list-item>-->
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
    <!--      </v-list-item>-->

    <!--      <v-divider></v-divider>-->
<!--    <template v-if="$store.state.isProject">-->
<!--      <new-project-object></new-project-object>-->

<!--    </template>-->
    <folder-tree-view></folder-tree-view>
    <!--      <v-btn flat @click="deleteObject">Delete</v-btn>-->

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
      const id = this.$store.state.objectId;
      await objectsRepository.delete(id);
    },
  },
};
</script>

<style scoped>

</style>
