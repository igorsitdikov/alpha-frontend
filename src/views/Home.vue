<template>
  <div class="home">
    <h1>Orion</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import RepositoryFactory from '@/repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('gis');

export default {
  name: 'Home',
  components: {
  },
  methods: {
    check: async () => {
      const { data } = await objectsRepository.getAll();
      console.log(data);
    },
  },
};
</script>
