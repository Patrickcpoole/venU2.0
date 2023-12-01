<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Quasar, { date } from 'quasar';
import { mapActions } from 'vuex';


export default {
  name: 'App',
  mounted() {
    this.authAction();
  },
  methods: {
    ...mapActions('auth', ['authAction']),
  },
};
</script>
