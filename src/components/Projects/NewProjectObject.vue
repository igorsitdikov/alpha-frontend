<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add project</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      centered
      title="Project name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form-checkbox
        id="checkbox-1"
        v-model="project"
        name="checkbox-1"
      >
        <template v-if="project">
          Add project
        </template>
        <template v-else>
          Add object
        </template>
      </b-form-checkbox>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <template v-if="!project">
        <b-input-group
          v-for="index in computedObj.length + 1"
          :key="index"
          class="mb-3"
          prepend="query"
        >
          <b-form-input v-model="queries[index-1]"
                        :value="queries[index-1]"
                        required
          ></b-form-input>
          <b-input-group-append>
            <b-button size="sm"
                      text="Delete"
                      variant="success"
                      @click="deleteQuery(index-1)">
              Delete
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <b-form-group label="Inline radios (default)">
          <b-form-radio-group
            v-model="selected"
            :options="options"
            name="radio-inline"
          ></b-form-radio-group>
        </b-form-group>
      </template>
    </b-modal>
  </div>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'NewProjectObject',
  data: () => ({
    name: '',
    nameState: null,
    project: true,
    parentId: null,
    userId: null,
    queries: [],
    query: '',
    limit: 3,
    selected: 'twitter',
    options: [
      { text: 'Twitter', value: 'twitter', disabled: false },
      { text: 'RSS', value: 'news', disabled: false },
      { text: 'Telegram', value: 'telegram', disabled: true },
    ],
  }),
  computed: {
    computedObj() {
      // return this.selected === 'twitter' ? this.queries.slice(0, this.limit) : this.queries;
      return this.queries.slice(0, this.limit);
    },
  },
  methods: {
    deleteQuery(index) {
      this.queries[index] = '';
      console.log(index);
      this.queries.splice(index, 1);
      console.log(this.queries);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
    },
    async handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      await this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.userId = this.$store.state.login.userId;
      this.parentId = this.$store.state.login.objectId;
      const parentIsProject = this.$store.state.login.isProject;

      let query = [];
      if (this.selected === 'twitter') {
        query = [
          { source: this.selected, query: this.queries.join(' OR ') },
        ];
      } else if (this.selected === 'news') {
        this.queries.forEach((link) => {
          query.push({
            source: this.selected, query: link,
          });
        });
      }

      if (this.userId !== null && parentIsProject) {
        await objectsRepository
          .create(this.name, this.project, this.parentId, this.userId, query);
        console.log('created');
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
      });
    },
  },
};
</script>

<style scoped>

</style>
