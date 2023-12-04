<template>
  <div>
    <q-dialog
      v-model="loginModal"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
      :content-css="{width: '400px'}"
      :content-class="['bg-primary', 'text-black']"
    >
      <q-card dark class="flex column justify-center items-center">
       <q-card-section >
         <h3 class="text-white font-weight-bolder text-center">Attention!</h3>
         <p class="text-white">The Spotify API associated with this application is still in development
        mode. When prompted by Spotify to login, please use the test login credentials below or contact me at patrickcpoole@gmail.com and I
      will add your Spotify account to the list of test users.</p>

      <p class="text-white text-weight-bolder">Test Spotify Credentials:</p>
      <ul class="text-white">
        <li>Email - venu2.0portoflio@gmail.com</li>
        <li>Password - Testpassword1</li>
      </ul>
        </q-card-section>
         <q-btn @click="login" label="I understand" type="submit" color="primary" style="width: 80%; margin-bottom: 15px;"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginModal",
  props: {
    loginModal: Boolean,
    username: String,
    password: String
  },
   methods: {
    ...mapActions({
      loginVue: "auth/login"
    }),

    async login(){
      console.log('did this login fire?')
      this.$emit('close')
      try {
        await this.loginVue({
          username: this.username,
          password: this.password
        })
      } catch(err){
        console.error(err)
      }
    }
  }

}
</script>



<style scoped>

</style>
