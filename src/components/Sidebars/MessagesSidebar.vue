<template>
  <v-navigation-drawer
    v-model="toggle"
    absolute
    left
  >
    <v-toolbar color="default"
               dark
               flat>
      <v-list-item-title>Messages count: {{messages.length}}</v-list-item-title>
    </v-toolbar>
    <v-card
      class="mx-auto"
      max-width="500"
      tile
    >
      <!--      <p>Messages count: {{messages.length}}</p>-->
      <v-list-item v-for="(tweet, index) in messages" v-bind:key="index">
        <v-list-item-content>
          <p>{{formatDate(tweet.date)}}</p>
          <p>{{tweet.brief}}</p>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MessagesSidebar',
  props: ['toggle', 'messages'],
  methods: {
    getDateString(date) {
      return date.toJSON()
        .split('T')[0];
    },
    formatDate(dStr) {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const todayStr = this.getDateString(today);
      const pieces = dStr.split('T');
      let formattedDate = pieces[0];
      if (pieces[0] === todayStr) {
        formattedDate = `${formattedDate} ${pieces[1].split('.')[0]}`;
      }
      return formattedDate;
    },
  },
};
</script>

<style scoped>

</style>
