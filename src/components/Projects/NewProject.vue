<template>
  <v-dialog v-model="$store.state.dialog.dialogProjectOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new project or object</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-switch v-model="isProject" label="Project" class="mx-2"></v-switch>
              <v-text-field label="Project or object name*" required></v-text-field>
            </v-col>
            <template v-if="isProject">
              <v-col cols="12" v-for="(item, index) in computedObj" :key="index">
                  <v-text-field label="Query*"
                                required
                                v-model="item.value"
                                :append-outer-icon="index < limit - 1 ? 'mdi-plus' : ''"
                                :append-icon="'mdi-minus'"
                                @click:append-outer="addFieldForQuery"
                                @click:append="remove(index)"
                  ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  justify-center
                  v-model="source"
                  :row=true
                >
                  <v-radio
                    v-for="(n, i) in options"
                    :key="i"
                    :label="`${n.text}`"
                    :value="n.value"
                    :disabled="n.disabled"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </template>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
        <v-btn color="blue darken-1" text @click="closeModal">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import RepositoryFactory from '../../repositories/RepositoryFactory';

// const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'NewProject',
  data: () => ({
    isProject: true,
    queries: [{ }],
    options: [
      {
        text: 'Twitter',
        value: 'twitter',
        disabled: false,
      },
      {
        text: 'RSS',
        value: 'news',
        disabled: false,
      },
      {
        text: 'Telegram',
        value: 'telegram',
        disabled: true,
      },
    ],
    source: 'twitter',
    limit: 4,
  }),
  computed: {
    computedObj() {
      // return this.selected === 'twitter' ? this.queries.slice(0, this.limit) : this.queries;
      return this.queries.slice(0, this.limit);
    },
  },
  // props: ['dialog'],
  methods: {
    closeModal() {
      this.$store.commit('setDialogProject', false);
    },
    addFieldForQuery() {
      if (this.queries.length < this.limit
        && this.queries[this.queries.length - 1].value !== undefined) {
        this.queries.push({ });
      }
      console.log(this.queries);
      console.log('add field');
    },
    remove(index) {
      this.queries.splice(index, 1);
      console.log(this.queries);
    },
  },
};
</script>

<style scoped>

</style>
