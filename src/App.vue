<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>

import Vue from 'vue'
import {mapActions} from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGuitar);

Vue.component('font-awesome-icon', FontAwesomeIcon);
export default {
  name: 'App',
  mounted() {

    this.authAction()

  },
  methods: {
    ...mapActions('auth', ['authAction'])
  }
}
</script>
