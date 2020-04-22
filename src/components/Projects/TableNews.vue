<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <b-table
            show-empty
            small
            stacked="md"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
          >
            <template v-slot:cell(name)="row">
              {{ row.value.first }} {{ row.value.last }}
            </template>

            <template v-slot:cell(actions)="row">
<!--              <b-button size="sm"
 @click="info(row.item, row.index, $event.target)" class="mr-1">-->
<!--                Info modal-->
<!--              </b-button>-->
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card bg-variant="dark" text-variant="white">
                <b-row class="mb-2">
                  <b-col sm="1" class="text-sm-right"><b>Text:</b></b-col>
                  <b-col> {{row.item.brief}}</b-col>
                </b-row>
<!--                <ul>-->
<!--                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>-->
<!--                </ul>-->
              </b-card>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
          <template v-if="loading">
            <loading></loading>
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';
import Loading from '../Loader/Loading.vue';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'Table',
  components: {
    Loading,
  },
  data: () => ({
    items: [
    ],
    objectId: null,
    fields: [
      {
        key: 'date', label: 'Date', sortable: true, sortDirection: 'desc',
      },
      {
        key: 'source', label: 'Source', sortable: true, sortDirection: 'desc',
      },
      {
        key: 'language', label: 'Language', sortable: true, class: 'text-center',
      },
      { key: 'actions', label: 'Actions' },
    ],
    totalRows: 1,
    currentPage: 1,
    perPage: 5,
    pageOptions: [5, 10, 15],
    sortBy: '',
    sortDesc: false,
    sortDirection: 'asc',
    filter: null,
    filterOn: [],
    infoModal: {
      id: 'info-modal',
      title: '',
      content: '',
    },
    loading: false,
  }),
  mounted() {
    this.$nextTick(async () => {
      this.objectId = this.$store.state.objectId;
      await this.getEntries(this.objectId);
    });
    this.$root.$on('showNews', async (id) => { await this.getEntries(id); });
  },
  beforeDestroy() {
    this.$root.$off('showNews', async (id) => { await this.getEntries(id); });
  },
  methods: {
    async getEntries(id) {
      // const id = this.$store.state.objectId;
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
        _showDetails: true,
      }));
      // Set the initial number of items
      this.totalRows = this.items.length;
      console.log(data);
      this.loading = false;
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>

</style>
