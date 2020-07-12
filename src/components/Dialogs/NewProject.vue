<template>
  <v-dialog v-model="$store.getters.dialogProjectOpen" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Create new project</span>
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
                    label="Project name*"
                    required></v-text-field>
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
    isProject: true,
    valid: true,
    projectRules: [
      (v) => !!v || 'Name is required',
    ],
    parentId: null,
    userId: null,
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
      this.$store.commit('setDialogProject', false);
    },
    async create() {
      if (this.$refs.form.validate()) {
        this.userId = this.$store.getters.userId;
        // const parentIsProject = this.$store.getters.isProject;
        this.parentId = this.$store.getters.objectId;
        const query = [];
        console.log(this.parentId);
        if (this.userId !== null) {
          await objectsRepository
            .create(this.name, this.isProject, this.parentId, this.userId, query);
          console.log('created');
          this.$root.$emit('showTree');
        }
        this.$store.commit('setDialogProject', false);
      }
    },
  },
};
</script>

<style scoped>

</style>
