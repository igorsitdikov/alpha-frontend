<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="check">check</button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import RepositoryFactory from '../repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('gis');

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  methods: {
    check: async () => {
      const { data } = await objectsRepository.getAll();
      console.log(data);
    },
  },
};
</script>
