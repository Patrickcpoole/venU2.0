<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated>
      <q-toolbar class="flex justify-between">
        <q-btn
          flat
          dense

          icon="menu"
          aria-label="Menu"
          @click="toggleLeftMenu = !toggleLeftMenu"
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
      v-model="toggleLeftMenu"
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

    <q-drawer
      :value="rightMenuVisible"
      :show-if-above="false"
      :width="350"
      @input="$store.dispatch('menu/closeRightMenu')"
      side="right"

    >
    
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
       <q-footer elevated v-if="$q.platform.is.mobile">
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
     <q-footer elevated v-if="!$q.platform.is.mobile">
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

import {menuState} from "../mixins/menuState"
import {venuesState} from "src/mixins/venuesState";

export default {
  name: 'MainLayout',
  mixins: [menuState, venuesState],
  components: {SidebarContent},
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
</style>
