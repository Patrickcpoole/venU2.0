<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="login"
      class="q-gutter-md"
    >
      <q-input
        filled
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

      />

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
      </div>
      <p class="text-danger">{{error}}</p>
    </q-form>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data(){
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
