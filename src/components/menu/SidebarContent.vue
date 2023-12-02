<template>
  <div class="sidebar-container">
    <!--    <q-avatar size="120px" style="margin-top: 20px">-->
    <!--            <q-img :src="user.photo_avatar"/>-->
    <!--          </q-avatar>-->
    <!--    <p class="name">{{ user.first_name }} {{ user.last_name }}</p>-->
    <!--    <p class="parent">{{ geography.name }}</p>-->
    <q-list>
      <q-item-label
        header
        class="text-grey-7"
      >
        Menu
      </q-item-label>
      <div v-if="$route.path !== '/' && $route.path !== '/signup/'">
        <EssentialLink
          v-for="link in authLinks"
          :key="link.title"
          v-bind="link"
        />
      </div>
      <div v-else>
      <EssentialLink
        v-for="link in loginLinks"
        :key="link.title"
        v-bind="link"
      />
        </div>

      <q-item
       v-if="$route.path !== '/' && $route.path !== '/signup/'"
        clickable
        @click="$store.dispatch('auth/logout')"
      >
        <q-item-section
          avatar
        >
          <q-icon name="logout" color="white"/>
        </q-item-section>

        <q-item-section>
          <q-item-label style="color:#fff">Logout</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>



import {authState} from "src/mixins/authState";
import EssentialLink from './EssentialLink'
import {route} from "quasar/wrappers";

export default {
  name: "SidebarContent.vue",
  mixins: [authState],
  methods: {
    route() {
      return route
    }
  },
  components: {EssentialLink},
  // mixins: [accountState],
  mounted() {
    console.log('this is user', this.user)
  },
  computed: {
    authLinks() {
      const links =
        [
          {
            title: 'Venues',
            icon: 'stadium',
            link: '/venues'
          },
          {
            title: 'Artists',
            icon: 'audiotrack',
            link: '/artists'
          },
          {
            title: 'Underground',
            icon: 'speaker',
            link: '/underground'
          },
          {
            title: 'Maps',
            icon: 'location_on',
            link: '/maps'
          },
          {
            title: 'Profile',
            icon: 'account_circle',
            link: '/profile'
          },

        ]
      return links
    },
    loginLinks() {
      const links =
        [
          {
            title: 'Sign In',

            icon: 'bar_chart',
            link: '/'
          },
          {
            title: 'Sign Up',
            icon: 'event_available',
            link: '/signup/'
          },

        ]
      return links
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped >
.sidebar-container  {
  border:0;
  background: #3B3B3B;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
}


.avatar {
  width: 3.5em;
  height: 3.5em;
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.name {
  text-align: center;
  font-size: 2em;
  margin-top: 5%;
}


.parent {
  font-size: 1.25em;
  color: #777;
  margin-top: -5%;
}

</style>
