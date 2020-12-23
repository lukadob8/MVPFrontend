<template>
  <v-main>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Sign Up Here</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Username" v-model="username"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <v-text-field label="Birthdate" v-model="birthdate"></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="addUser()" class="orange lighten-3">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="goDiscover()" class="orange lighten-3">Explore</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="goLogin()" class="orange lighten-3">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: "signup-form",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      birthdate: ""
    };
  },
  methods: {
    addUser: function() {
      axios
        .request({
          method: "POST",
          url: "http://127.0.0.1:5000/api/users",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            email: this.email,
            username: this.username,
            password: this.password,
            birthdate: this.birthdate
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

    goDiscover: function() {
      this.$router.push({ name: "discover-page" });
    },

    goLogin: function() {
      this.$router.push({ name: "login-page" });
    }
  }
};
</script>

<style lang="sass" scoped></style>
