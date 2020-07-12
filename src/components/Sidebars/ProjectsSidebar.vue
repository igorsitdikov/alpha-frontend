<template>
  <div>
    <v-navigation-drawer
      style="z-index: 2"
      v-model="$store.getters.projectSidebarOpen"
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
          <v-btn
            color="error"
            dark
            small
            absolute
            center
            right
            fab
            @click="dialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

      </v-toolbar>
      <folder-tree-view></folder-tree-view>

    </v-navigation-drawer>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Remove object ?
        </v-card-title>
        <v-card-text>Name : {{objectName}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="deleteObject">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
  computed: {
    objectName() {
      return this.$store.getters.object === null ? 'undefined' : this.$store.getters.object.name;
    },
  },
  methods: {
    changeDialogState() {
      this.$store.dispatch('toggleProjectDialog');
    },
    async deleteObject() {
      // eslint-disable-next-line no-underscore-dangle
      const id = this.$store.getters.objectId;
      await objectsRepository.delete(id);
      this.$root.$emit('showTree');
      this.dialog = false;
    },
  },
};
</script>

<style scoped>

</style>
