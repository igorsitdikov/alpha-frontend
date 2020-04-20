<template>
  <div id="app">
    <b-sidebar id="sidebar-projects" title="Projects" shadow>
        <template v-if="$store.state.isProject">
          <new-project-object></new-project-object>
        </template>
        <folder-tree-view></folder-tree-view>
    </b-sidebar>
    <div id="nav">
      <b-button v-b-toggle.sidebar-projects> <b-icon icon="briefcase-fill"></b-icon> </b-button>
      <router-link v-if="$store.state.authorized" to="/">Home</router-link>
      <router-link v-if="$store.state.authorized" to="/about">About</router-link>
      <router-link v-if="$store.state.authorized" to="/news">News</router-link>
      <router-link v-if="$store.state.authorized" to="/charts">Charts</router-link>
      <router-link v-if="$store.state.authorized" to="/maps">Maps</router-link>
      <router-link v-if="$store.state.role" to="/admin">Admin</router-link>
      <router-link v-if="$store.state.authorized" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NewProjectObject from './components/Projects/NewProjectObject.vue';
import FolderTreeView from './components/Projects/FolderTreeView.vue';

export default {
  name: 'app',
  components: {
    NewProjectObject, FolderTreeView,
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

.sl-vue-tree {
  margin: auto;
}
</style>
