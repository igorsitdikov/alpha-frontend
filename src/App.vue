<template>
  <div id="app">
    <v-app>
      <NavSidebar></NavSidebar>
<!--      <ProjectsSidebar></ProjectsSidebar>-->
      <NewProject></NewProject>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import NavSidebar from './components/Sidebars/NavSidebar.vue';
// import ProjectsSidebar from './components/Sidebars/ProjectsSidebar.vue';
import NewProject from './components/Projects/NewProject.vue';

export default {
  name: 'app',
  components: {
    NewProject,
    // ProjectsSidebar,
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
