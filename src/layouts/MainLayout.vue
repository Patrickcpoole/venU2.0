<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-center">
          VenU - Denver
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
<!--      <q-list>-->
<!--        <q-item-label-->
<!--          header-->
<!--          class="text-grey-8"-->
<!--        >-->
<!--          Essential Links-->
<!--        </q-item-label>-->

<!--      </q-list>-->
      <sidebar-content />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
     <q-footer elevated>
      <q-tabs
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
      >
        <q-route-tab name="venues" to="/venues" icon="stadium" label="Venues"/>
        <q-route-tab name="artists" to="/artists" icon="audiotrack" label="Artists"/>
        <q-route-tab name="underground" to="/underground" icon="speaker" label="Underground"/>
        <q-route-tab name="maps" to="/maps" icon="location_on" label="Maps"/>
        <q-route-tab name="profile" to="/profile" icon="account_circle" label="Profile"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>


const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

import SidebarContent from "components/SidebarContent";

export default {
  name: 'MainLayout',
  components: {SidebarContent},
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
