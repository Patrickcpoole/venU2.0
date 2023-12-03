<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      v-if="!codeToggle"
      @submit="signUp"
      class="q-gutter-md flex column justify-start"
      dark

    >
      <q-input
        filled
        v-model="username"
        label="Username"


        dark
      />

      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" dark label="Password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="confirmPassword" filled :type="isPwd ? 'password' : 'text'" dark label="Confirm Password">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        dark
        filled
        v-model="email"
        label="Email"
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
      dark
    >
      <q-input
        filled
        v-model="code"
        label="Code"
        lazy-rules
        dark
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
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      isPwd: true,
      error: '',
      codeToggle: false,
      code: ''
    }
  },
  methods: {
    validateEmail(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    signUp() {
      console.log('signup triggered', this.email, this.password)
      if (!this.validateEmail(this.email)) {
        this.$q.notify({type: 'negative', message: 'Invalid email format'});
        return;
      }
      if (this.username.length < 3) {
        this.$q.notify({type: 'negative', message: 'Please create a username with at least 3 characters'});
        return
      }

      if (this.password.length < 8) {
        this.$q.notify({type: 'negative', message: 'Please create a password with at least 8 characters'});
        return
      }

      if (this.password !== this.confirmPassword) {
        this.$q.notify({type: 'negative', message: 'Passwords do not match'});
        return;
      }

      try {
        this.$store.dispatch('auth/signUp', {
          username: this.username,
          password: this.password,
          email: this.email
        })


      } catch (error) {
        this.error = error
      }
    },

    async confirmSignUp() {
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
      } catch (error) {
        this.error = error
      }
    }
  }
}
</script>

<style scoped>

</style>
