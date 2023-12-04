<template>
  <div class="q-pa-md" style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center; ">

    <q-form
      @submit="loginModal = true"
      class="q-gutter-sm"
      dark
      style="width:80%;"
    >
      <q-input
        filled
        dark
        v-model="username"
        label="Username"
        lazy-rules

        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input v-model="password" filled  label="Password" :type="isPwd ? 'password' : 'text'"  dark>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>



      <div>
        <q-btn label="Login" type="submit" color="primary" style="width: 100%; margin-top: 15px;"/>
        <q-btn label="Create Account" @click="$router.push('/signup')" color="blue" style="width: 100%; margin-top: 15px;"/>
      </div>

    </q-form>
  <login-modal :loginModal="loginModal" :username="username" :password="password" @close="loginModal=false"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import LoginModal from "components/LoginModal.vue";
export default {
  name: "Login",
  components: {LoginModal},
  mounted(){
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

</style>
