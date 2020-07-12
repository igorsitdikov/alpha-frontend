<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="loading"
        loading-text="Loading... Please wait"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        item-key="name"
        show-expand
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>News</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.urls="{ item }">
          <div v-for="(url, index) in item.urls" :key="index">
            <a :href="url" dark>{{ url }}</a>
          </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :bgcolor="`${computedSource(item.source).color}`"
              :colspan="headers.length">{{ item.brief }}
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            @click="deleteItem(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <!--    <div class="text-center pt-2">-->
      <!--      <v-pagination v-model="page" :length="pageCount"></v-pagination>-->
      <!--      <v-menu open-on-hover top offset-y>-->
      <!--        <template v-slot:activator="{ on }">-->
      <!--          <v-btn-->
      <!--            color="primary"-->
      <!--            dark-->
      <!--            v-on="on"-->
      <!--          >-->
      <!--            Dropdown-->
      <!--          </v-btn>-->
      <!--        </template>-->
      <!--        <v-list>-->
      <!--          <v-list-item-->
      <!--            v-for="(item, index) in elements"-->
      <!--            :key="index"-->
      <!--            @click="itemsPerPage = item.num"-->
      <!--          >-->
      <!--            <v-list-item-title>{{ item.num }}</v-list-item-title>-->
      <!--          </v-list-item>-->
      <!--        </v-list>-->
      <!--      </v-menu>-->
      <!--    </div>-->
    </v-col>
  </v-row>
</template>

<script>
import utils from '../Charts/utils';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
const entriesRepository = RepositoryFactory.get('entries');
export default {
  name: 'ExpandedTableNews',
  data: () => ({
    expanded: [],
    singleExpand: true,
    headers: [
      {
        text: 'Date',
        value: 'date',
      },
      {
        text: 'Source',
        value: 'source',
      },
      {
        text: 'Language',
        value: 'language',
      },
      {
        text: 'Urls',
        value: 'urls',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
      },
    ],
    items: [],
    loading: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    elements: [
      { num: 3 },
      { num: 5 },
      { num: 7 },
      { num: 10 },
    ],
  }),
  mounted() {
    this.$nextTick(async () => {
      this.objectId = this.$store.getters.objectId;
      await this.getEntries(this.objectId);
    });
    this.$root.$on('showNews', async (id) => {
      await this.getEntries(id);
    });
  },
  beforeDestroy() {
    this.$root.$off('showNews', async (id) => {
      await this.getEntries(id);
    });
  },
  methods: {
    computedSource: (source) => utils.computedSource(source),
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
        // eslint-disable-next-line no-underscore-dangle
        id: el._id,
      }));
      this.loading = false;
    },
    async deleteItem(id) {
      this.items = this.items.filter((el) => el.id !== id);
      await entriesRepository.delete(id);
    },
  },
};
</script>

<style scoped>

</style>
