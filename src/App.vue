<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="$store.state.authorized" to="/">Home</router-link>
      <router-link v-if="$store.state.authorized" to="/about">About</router-link>
      <router-link v-if="$store.state.authorized" to="/projects">Projects</router-link>
      <router-link v-if="$store.state.authorized" to="/charts">Charts</router-link>
      <router-link v-if="$store.state.authorized" to="/maps">Maps</router-link>
      <router-link v-if="$store.state.role" to="/admin">Admin</router-link>
      <router-link v-if="$store.state.authorized" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
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
</style>
