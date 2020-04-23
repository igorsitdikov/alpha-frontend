<template>
  <div id="app">
    <NavSidebar></NavSidebar>
    <ProjectsSidebar></ProjectsSidebar>
    <router-view/>
  </div>
</template>

<script>
import NavSidebar from './components/Sidebars/NavSidebar.vue';
import ProjectsSidebar from './components/Sidebars/ProjectsSidebar.vue';

export default {
  name: 'app',
  components: {
    ProjectsSidebar,
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
