<template>
  <div class="q-pa-md" style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center; ">

    <q-form
      @submit="login"
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

      <q-input
        filled
        v-model="password"
        label="Password"
        lazy-rules
        dark

      />

      <div>
        <q-btn label="Login" type="submit" color="primary" style="width: 100%; margin-top: 15px;"/>
        <q-btn label="Create Account" @click="$router.push('/signup')" color="blue" style="width: 100%; margin-top: 15px;"/>
      </div>
      <p class="text-danger">{{ error }}</p>
    </q-form>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      email: '',
      error: ' '
    }
  },
  methods: {
    ...mapActions({
      loginVue: "auth/login"
    }),
    loginSpotify() {
      fetch('http://localhost:3000/login/')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch(console.log('error'));
     },
    async login(){
      console.log('did this login fire?')
      try {
        await this.loginVue({
          username: this.username,
          password: this.password
        })
      } catch(err){
        this.error = err
      }
    }
  }

}
</script>

<style scoped>

</style>
