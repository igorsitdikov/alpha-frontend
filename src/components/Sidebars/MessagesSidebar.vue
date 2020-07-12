<template>
  <v-navigation-drawer
    v-model="toggle"
    absolute
    width="300"
    style="z-index: 3"
    left
  >
    <v-toolbar color="default"
               dark
               flat>
      <v-list-item-title>Messages count: {{messages.length}}</v-list-item-title>
      <v-btn
        icon
        @click.stop="hideMessageSidebar"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-col
      v-for="(item, i) in messages"
      :key="i"
      cols="12"
    >
      <v-card
        class="mx-auto"
        :color="`${computedSource(item.source).color}`"
        dark
        max-width="400"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title>
              <v-icon
                medium
                left
              >
                {{computedSource(item.source).icon}}
              </v-icon>
              <span class="title font-weight-light">
                {{computedSource(item.source).title}} {{formatDate(item.date)}}
              </span>
            </v-card-title>
            <v-card-subtitle class="subtitle-1" v-text='`"${item.brief}"`'></v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
import utils from '../Charts/utils';

export default {
  name: 'MessagesSidebar',
  props: ['toggle', 'messages'],
  methods: {
    computedSource: (source) => utils.computedSource(source),
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
    hideMessageSidebar() {
      this.$root.$emit('hideMessageSidebar');
    },
  },
};
</script>

<style scoped>

</style>
