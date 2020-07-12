<template>
  <v-dialog v-model="$store.getters.dialogObjectOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new object</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-col cols="12">
                  <v-text-field
                    :rules="projectRules"
                    v-model="name"
                    label="Object name*"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" v-for="(item, index) in computedObj" :key="index">
                  <v-text-field label="Query*"
                                required
                                :rules="computedRule"
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
              </v-form>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
        <v-btn color="blue darken-1" text @click="create">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'NewProject',
  data: () => ({
    isProject: false,
    valid: true,
    queries: [{}],
    options: [
      {
        text: 'Twitter',
        value: 'twitter',
        disabled: false,
        rule: [
          (v) => !!v || 'query is required',
        ],
      },
      {
        text: 'RSS',
        value: 'news',
        disabled: false,
        rule: [
          (v) => !!v || 'query is required',
          (v) => /^(ftp|http|https):\/\/[^ "]+$/.test(v),
        ],
      },
      {
        text: 'Telegram',
        value: 'telegram',
        disabled: true,
      },
    ],
    parentId: null,
    userId: null,
    source: 'twitter',
    limit: 4,
    name: '',
  }),
  computed: {
    computedRule() {
      return this.options.filter((v) => v.value === this.source)[0].rule;
    },
    computedObj() {
      // return this.selected === 'twitter' ? this.queries.slice(0, this.limit) : this.queries;
      return this.queries.slice(0, this.limit);
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('setDialogObject', false);
    },
    async create() {
      if (this.$refs.form.validate()) {
        this.userId = this.$store.getters.userId;
        this.parentId = this.$store.getters.objectId;

        let query = [];
        if (!this.isProject) {
          if (this.source === 'twitter') {
            query = [
              {
                source: this.source,
                query: this.queries.map((el) => `"${el.value}"`)
                  .join(' OR '),
              },
            ];
          } else if (this.source === 'news') {
            this.queries.forEach((link) => {
              query.push({
                source: this.source,
                query: link.value,
              });
            });
          }
        }
        console.log(this.parentId);
        if (this.userId !== null) {
          await objectsRepository
            .create(this.name, this.isProject, this.parentId, this.userId, query);
          console.log('created');
          this.$root.$emit('showTree');
        }
        this.$store.commit('setDialogObject', false);
      }
    },
    addFieldForQuery() {
      if (this.queries.length < this.limit
          && this.queries[this.queries.length - 1].value !== undefined) {
        this.queries.push({});
      }
    },
    remove(index) {
      if (index !== 0) {
        this.queries.splice(index, 1);
      } else if (this.queries[0].value !== undefined
          && index === 0
          && this.queries.length > 1) {
        this.queries.splice(index, 1);
      } else if (index === 0) {
        this.queries[0].value = undefined;
      }
    },
  },
};
</script>

<style scoped>

</style>
