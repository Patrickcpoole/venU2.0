<template>
  <q-layout view="lHr lpr lFr" >
    <q-header elevated>
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense

          icon="menu"
          aria-label="Menu"
          @click="$store.dispatch('menu/toggleLeftMenu')"
          style="z-index: 10"
        />

        <div class="q-toolbar-title text-center full-width absolute" style="font-size: 1.5em; z-index: 0; padding-right: 2%">
          <h5>{{ selectedVenue !== null && $route.path === '/concerts' ? selectedVenue.name : $route.name }}</h5>
        </div>
         <q-btn
           v-if="rightMenuVisible"
          flat
          dense
          icon="close"
          @click="$store.dispatch('menu/toggleRightMenu')"
          style="z-index: 10"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      :value="leftMenuVisible"
      @input="$store.dispatch('menu/toggleLeftMenu')"
      content-class="bg-grey-1"

       overlay
    >


      <sidebar-content />
    </q-drawer>

    <q-drawer
      :value="rightMenuVisible"
      :width="350"
      overlay
      :show-if-above="false"
      v-click-outside="{ isOpen: rightMenuVisible, close: $store.dispatch('menu/closeRightMenu')}"
      @input="$store.dispatch('menu/closeRightMenu')"
      side="right"
      content-class="bg-grey-1"
    >
      <concert-sidebar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
       <q-footer elevated v-if="$q.platform.is.mobile && $route.path !== '/' && $route.path !== '/signup'">
      <q-tabs
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
      >
        <q-route-tab name="venues" to="/venues" icon="stadium" label="Venues"/>
        <q-route-tab name="concerts" to="/concerts" icon="audiotrack" label="Concerts"/>
        <q-route-tab name="profile" to="/profile" icon="account_circle" label="Profile"/>
      </q-tabs>
    </q-footer>
     <q-footer elevated v-if="!$q.platform.is.mobile && $route.path !== '/' && $route.path !== '/signup'">
      <q-tabs
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
      >
        <q-route-tab name="venues" to="/venues" icon="stadium" label="Venues"/>
        <q-route-tab name="concerts" to="/concerts" icon="audiotrack" label="Concerts"/>
        <q-route-tab name="underground" to="/underground" icon="speaker" label="Underground"/>
        <q-route-tab name="maps" to="/maps" icon="location_on" label="Maps"/>
        <q-route-tab name="profile" to="/profile" icon="account_circle" label="Profile"/>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>

import SidebarContent from "src/components/menu/SidebarContent";
import ConcertSidebar from "src/components/concerts/ConcertSidebar";
import menuState from "../mixins/menuState";
import venuesState from "src/mixins/venuesState";

export default {
  name: 'MainLayout',
  mixins: [menuState, venuesState],
  components: {SidebarContent, ConcertSidebar},
  directives: {
    clickOutside: {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          console.log('testing', testing)
          // Check if the drawer is open and the click was outside the el
          if (binding.value.isOpen && !(el == event.target || el.contains(event.target))) {
            // Call the provided method to close the drawer
            binding.value.close();
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      beforeUnmount(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  data() {
    return {
      toggleLeftMenu: false,
    }
  },

}


</script>

<style scoped>
.q-toolbar-title.full-width {

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-drawer {
  z-index: 1030; /* Higher than the header */
  position: absolute; /* Ensure it's positioned in relation to the layout */
  top: 0; /* Align to the top */
  right: 0; /* Align to the right */
  height: 100%; /* Full height */
}
</style>
