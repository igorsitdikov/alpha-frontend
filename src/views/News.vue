<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ExpandedTableNews></ExpandedTableNews>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ExpandedTableNews from '../components/Projects/ExpandedTableNews.vue';

export default {
  name: 'News',
  components: { ExpandedTableNews },
  data: () => ({}),
};
</script>

<style scoped>

</style>
