<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    loading-text="Loading... Please wait"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>News</v-toolbar-title>
        <v-spacer></v-spacer>
<!--        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>-->
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">{{ item.brief }}</td>
    </template>
  </v-data-table>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'ExpandedTableNews',
  data: () => ({
    expanded: [],
    singleExpand: true,
    headers: [
      { text: 'Date', value: 'date' },
      { text: 'Source', value: 'source' },
      { text: 'Language', value: 'language' },
      { text: 'Urls', value: 'urls' },
    ],
    items: [],
    loading: false,
  }),
  mounted() {
    this.$nextTick(async () => {
      this.objectId = this.$store.state.login.objectId;
      await this.getEntries(this.objectId);
    });
    this.$root.$on('showNews', async (id) => { await this.getEntries(id); });
  },
  beforeDestroy() {
    this.$root.$off('showNews', async (id) => { await this.getEntries(id); });
  },
  methods: {
    async getEntries(id) {
      this.loading = true;
      console.log(`selected ${id}`);
      const { data } = await objectsRepository.get(id);
      this.items = data.entries.map((el) => ({
        brief: el.brief,
        date: el.date
          .replace('T', ' ')
          .replace('.000Z', ''),
        language: el.language,
        source: el.source,
        urls: el.urls,
      }));
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
