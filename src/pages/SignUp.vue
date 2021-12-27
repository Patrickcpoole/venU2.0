<template>
 <div class="q-pa-md" style="max-width: 400px">

    <q-form
      v-if="!confirmPassword"
      @submit="signUp"
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

      <q-input
        filled
        v-model="email"
        label="email"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your email',
        ]"
      />

      <div>
        <q-btn label="Sign Up" type="submit" color="primary"/>
      </div>
    </q-form>
   <q-form
      v-else
      @submit="confirmSignUp"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="code"
        label="Code"
        lazy-rules

      />

      <div>
        <q-btn label="Confirm" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script>
export default {
  name: "SignUp",
  data(){
    return {
      username: '',
      password: '',
      email: '',
      error: '',
      confirmPassword: false,
      code: ''
    }
},
  methods: {
    signUp(){
      console.log('signup triggered', this.email, this.password)
      if(!this.email || !this.password) {
        return
      }
      try {
        this.$store.dispatch('auth/signUp', {
          username: this.username,
          password: this.password,
          email: this.email
        })

        this.confirmPassword = true

      } catch(error) {
        this.error = error
      }
    },

   async  confirmSignUp(){
      if (!this.username || !this.code) {
        return
      }

      try {
        await this.$store.dispatch('auth/confirmSignUp', {
          username: this.username,
          code: this.code
        })
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password
        })
        this.$router.push('/venues')
      } catch(error) {
          this.error = error
      }
    }
  }
}
</script>

<style scoped>

</style>
