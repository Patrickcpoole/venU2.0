import { library } from '@fortawesome/fontawesome-svg-core';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';


library.add(faGuitar);
Vue.component('font-awesome-icon', FontAwesomeIcon);
