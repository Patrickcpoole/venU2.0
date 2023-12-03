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

      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'"  dark>
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
      isPwd: true,
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
