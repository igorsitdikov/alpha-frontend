<template>
  <div>
    <h3>Projects and Objects</h3>
    <folder-tree-view></folder-tree-view>
  </div>
</template>

<script>
import FolderTreeView from '../components/Projects/FolderTreeView.vue';

export default {
  name: 'Projects',
  components: { FolderTreeView },
};
</script>

<style scoped>

</style>
