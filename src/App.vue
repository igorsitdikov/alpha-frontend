<template>
  <div id="app">
    <v-app>
      <NavSidebar></NavSidebar>
      <NewProject></NewProject>
      <NewObject></NewObject>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import NavSidebar from './components/Sidebars/NavSidebar.vue';
import NewObject from './components/Dialogs/NewObject.vue';
import NewProject from './components/Dialogs/NewProject.vue';

export default {
  name: 'app',
  components: {
    NewProject,
    NewObject,
    NavSidebar,
  },
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*background-color: #1e1e2f;*/
  }

  label {
    margin-bottom: 0;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      margin: 0 10px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .routes li {
    display: inline-block;
  }
</style>
