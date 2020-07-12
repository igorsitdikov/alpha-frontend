<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <folder-tree-view></folder-tree-view>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory';
import FolderTreeView from '../components/Projects/FolderTreeView.vue';

const objectsRepository = RepositoryFactory.get('gis');

export default {
  name: 'Home',
  components: {
    FolderTreeView,
  },
  methods: {
    check: async () => {
      const { data } = await objectsRepository.getAll();
      console.log(data);
    },
  },
};
</script>
