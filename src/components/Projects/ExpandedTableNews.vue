<template>
  <v-row>
    <v-col cols="6">
      <v-data-iterator
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
        <template v-slot:default="props">
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <v-row class="flex-grow-1 flex-shrink-1 "
                   v-for="(key, index) in filteredKeys"
                   :key="index"
            >
              <template v-if="key === 'Urls'">
                <v-col cols="1" class="justify-start text-left pt-0"
                       :class="{ 'blue--text': sortBy === key }">
                  {{ key }}:
                </v-col>
                <v-col cols="11" class="justify-start text-left pt-0"
                       :class="{ 'blue--text': sortBy === key }">
                  <div v-for="(url, index) in item.urls" :key="index">
                    <a :href="url" target="_blank">{{ url }}</a>
                  </div>
                </v-col>
              </template>
              <template v-else>
                <v-col cols="1" class="justify-start text-left pt-0"
                       :class="{ 'blue--text': sortBy === key }">
                  {{ key }}:
                </v-col>
                <v-col cols="11" class="justify-start text-left pt-0"
                       :class="{ 'blue--text': sortBy === key }">
                  {{ item[key.toLowerCase()] }}
                </v-col>
              </template>
            </v-row>
            <v-row>
              <v-col cols="2" offset="10">
                <v-btn icon @click="deleteItem(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-col>
        </template>
      </v-data-iterator>
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
    sortBy: 'date',
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
    keys: [
      'Date',
      'Brief',
      // 'Language',
      // 'Source',
      'Urls',
    ],
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
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name');
    },
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
