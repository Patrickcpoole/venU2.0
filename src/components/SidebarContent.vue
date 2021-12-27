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
      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      />
      <q-item

        clickable
        @click="$store.dispatch('auth/logout')"
      >
        <q-item-section
          avatar
        >
          <q-icon name="logout"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>

// import {accountState} from "src/mixins/accountState";




import EssentialLink from './EssentialLink'

export default {
  name: "SidebarContent.vue",
  components: {EssentialLink},
  // mixins: [accountState],
  mounted(){
    console.log('this is user', this.user)
  },
  computed: {
    essentialLinks(){
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
    return {
    }
  }
}
</script>

<style scoped lang="scss">

.sidebar-container {
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
  border: 2px solid #666;
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
