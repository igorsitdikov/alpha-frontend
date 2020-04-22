<template>
  <div id="app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      :expand-on-hover=true
      absolute
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="./assets/logo.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Orion</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in filteredRoutes"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title @click.stop="drawerRight = !drawerRight" v-if="item.project">
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-title v-else>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerRight"
      absolute
      right
    >
      <v-list-item class="px-2">
        <v-list-item-title>Projects</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <template v-if="$store.state.isProject">
        <new-project-object></new-project-object>
      </template>
      <folder-tree-view></folder-tree-view>
<!--      <v-btn flat @click="deleteObject">Delete</v-btn>-->
    </v-navigation-drawer>
    <router-view/>
  </div>
</template>

<script>
import NewProjectObject from './components/Projects/NewProjectObject.vue';
import FolderTreeView from './components/Projects/FolderTreeView.vue';
import RepositoryFactory from './repositories/RepositoryFactory';

const objectsRepository = RepositoryFactory.get('objects');
export default {
  name: 'app',
  components: {
    NewProjectObject, FolderTreeView,
  },
  computed: {
    filteredRoutes() {
      return this.routes.filter((el) => {
        if (el.admin && !this.$store.state.role) {
          return false;
        }
        return !(!el.admin && !this.$store.state.authorized);
      });
    },
  },
  data: () => ({
    mini: true,
    drawer: true,
    drawerRight: false,
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    routes: [
      {
        title: 'Home', icon: 'mdi-home-city', admin: false, link: '/', project: false,
      },
      {
        title: 'About', icon: 'mdi-information-variant', admin: false, link: '/about', project: false,
      },
      {
        title: 'Charts', icon: 'mdi-chart-multiple', admin: false, link: '/charts', project: false,
      },
      {
        title: 'Maps', icon: 'mdi-map', admin: false, link: '/maps', project: false,
      },
      {
        title: 'News', icon: 'mdi-newspaper-variant-outline', admin: false, link: '/news', project: false,
      },
      {
        title: 'Projects', icon: 'mdi-folder-table-outline', admin: false, link: '', project: true,
      },
      {
        title: 'Admin', icon: 'mdi-account-group-outline', admin: true, link: '/admin', project: false,
      },
      {
        title: 'Logout', icon: 'mdi-logout', admin: false, link: '/logout', project: false,
      },
    ],
  }),
  methods: {
    async deleteObject() {
      const id = this.$store.state.objectId;
      await objectsRepository.delete(id);
    },
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
