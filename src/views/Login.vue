<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="goSignup()" class="orange lighten-3">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="loginUser()" class="orange lighten-3">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser: function() {
      axios
        .request({
          method: "POST",
          url: "http://127.0.0.1:5000/api/login",
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(response => {
          console.log(response);
          cookies.set("session", response.data.loginToken);
          cookies.set("userId", response.data.userId);
          this.$router.push({ name: "discover-page" });
        })
        .catch(error => {
          console.log(error);
        });
    },

    goSignup: function() {
      this.$router.push({ name: "signup-page" });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>