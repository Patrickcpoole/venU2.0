<template>
  <div class="q-pa-md"
       style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
    <q-card dark class="login-card">
      <q-card-section style="width: 100%">
        <q-form
          @submit="loginModal = true"
          dark
          style="width:100%;"
        >
          <q-input
            filled
            dark
            v-model="username"
            label="Username"
            lazy-rules

            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input v-model="password" filled label="Password" :type="isPwd ? 'password' : 'text'" dark>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>

        <q-btn label="Login" @click="loginModal = true" color="primary" style="width: 90%; margin-top: 15px;" class="q-ma-md"/>
        <q-btn label="Create Account" @click="$router.push('/signup')" color="blue"  class="q-ma-md"
               style="width: 90%; "/>

    </q-card>
    <login-modal :loginModal="loginModal" :username="username" :password="password" @close="loginModal=false"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import LoginModal from "components/LoginModal.vue";

export default {
  name: "Login",
  components: {LoginModal},
  mounted() {
    this.$route.query.openModal === 'true' ? this.loginModal = true : this.loginModal = false
    this.username = this.$route.query.username
    this.password = this.$route.query.password
  },
  data() {
    return {
      loginModal: false,
      username: '',
      password: '',
      isPwd: true,
      email: '',

    }
  },


}
</script>

<style scoped>
.login-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 15px;
}
</style>
