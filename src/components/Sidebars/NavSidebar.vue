<template>
  <v-navigation-drawer
    v-if="$store.state.login.authorized"
    v-model="drawer"
    :mini-variant.sync="mini"
    :expand-on-hover=true
    absolute
    permanent
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="../../assets/logo.jpg"></v-img>
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
          <v-list-item-title @click.stop="changeModalState" v-if="item.project">
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-title v-else>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'NavSidebar',
  components: {
  },
  computed: {
    filteredRoutes() {
      return this.routes.filter((el) => {
        if (el.admin && !this.$store.state.login.role) {
          return false;
        }
        return !(!el.admin && !this.$store.state.login.authorized);
      });
    },
  },
  data: () => ({
    mini: true,
    drawer: true,
    drawerRight: false,
    dialog: false,
    items: [
      {
        title: 'Home',
        icon: 'mdi-home-city',
      },
      {
        title: 'My Account',
        icon: 'mdi-account',
      },
      {
        title: 'Users',
        icon: 'mdi-account-group-outline',
      },
    ],
    routes: [
      {
        title: 'Home',
        icon: 'mdi-home-city',
        admin: false,
        link: '/',
        project: false,
      },
      {
        title: 'About',
        icon: 'mdi-information-variant',
        admin: false,
        link: '/about',
        project: false,
      },
      {
        title: 'Charts',
        icon: 'mdi-chart-multiple',
        admin: false,
        link: '/charts',
        project: false,
      },
      {
        title: 'Maps',
        icon: 'mdi-map',
        admin: false,
        link: '/maps',
        project: false,
      },
      {
        title: 'News',
        icon: 'mdi-newspaper-variant-outline',
        admin: false,
        link: '/news',
        project: false,
      },
      {
        title: 'Projects',
        icon: 'mdi-folder-table-outline',
        admin: false,
        link: '',
        project: true,
      },
      {
        title: 'Admin',
        icon: 'mdi-account-group-outline',
        admin: true,
        link: '/admin',
        project: false,
      },
      {
        title: 'Logout',
        icon: 'mdi-logout',
        admin: false,
        link: '/logout',
        project: false,
      },
    ],
  }),
  methods: {
    changeModalState() {
      this.$store.commit('toggleProjectSidebar');
    },
  },
};
</script>

<style scoped>

</style>
