<template>
  <div>
    <page-header />
    <div v-if="loginToken = loginToken">
      <br />
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Ask a Question</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title"></v-text-field>
          <br />
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Question"
            auto-grow
            v-model="content"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="postQuestion()" class="orange lighten-3">Ask</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="goDiscover()" class="orange lighten-3">Back</v-btn>
        </v-card-actions>
        <v-card-text>{{message}}</v-card-text>
      </v-card>
    </div>
    <div v-if="loginToken == undefined">
      <v-card-title>Please Signup or Login to continue</v-card-title>
      <v-btn @click="$router.push({name: 'login-page'})" class="orange lighten-3">Login</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import PageHeader from "../components/Header.vue";

export default {
  name: "ask-page",
  components: {
    PageHeader
  },
  data() {
    return {
      title: "",
      content: "",
      message: "",
      loginToken: cookies.get("session")
    };
  },
  methods: {
    postQuestion: function() {
      axios
        .request({
          method: "POST",
          url: "http://127.0.0.1:5000/api/questions",
          data: {
            loginToken: cookies.get("session"),
            title: this.title,
            content: this.content
          }
        })
        .then(response => {
          console.log(response);
          this.message = "Successfully posted question!";
          this.title = "";
          this.content = "";
        })
        .catch(error => {
          console.log(error);
          this.message =
            "There was an error posting your question. Please try again.";
        });
    },

    goDiscover: function() {
      this.$router.push({ name: "discover-page" });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>