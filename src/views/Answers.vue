<template>
  <div>
    <page-header />
    <br>
    <div>
      <v-card width="700" class="mx-auto mt-5">
        <v-card-text>Subject: {{ question.title }}</v-card-text>
        <v-card-subtitle>Asked by: {{ question.username }}</v-card-subtitle>
        <v-card-title>Question: {{ question.content }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>Asked On: {{ question.createdAt }}</v-card-text>
        <v-card-actions>
          <v-btn @click="goDiscover()" class="orange lighten-3">Back</v-btn>
        </v-card-actions>
      </v-card>
      <br>
      <v-btn v-if="answering == false" @click="answering = !answering" class="orange lighten-3">Answer</v-btn>
      <v-card v-if="answering == true" width="400" class="mx-auto mt-5">
        <v-textarea
          v-model="userAnswer"
          label="Answer"
          clearable
          clear-icon="mdi-close-circle"
          auto-grow
        ></v-textarea>
        <v-divider></v-divider>
        <v-btn @click="postAnswer()" class="orange lighten-3">Submit</v-btn>
        <v-divider></v-divider>
        <v-card-text>{{message}}</v-card-text>
      </v-card>
      <br>
      <h2 class="text-center orange--text text--darken-4">Answers</h2>
      <br>
      <div v-for="answer in answers" :key="answer.answerId">
        <v-card width="500" class="mx-auto mt-5">
          <v-card-title>Answer: {{ answer.content}}</v-card-title>
          <v-card-subtitle>Answered by: {{ answer.username }}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-subtitle>Answered On: {{ answer.createdAt }}</v-card-subtitle>
          <v-divider></v-divider>
          <like-btn :answerId="answer.answerId"></like-btn>
          <!-- <v-card-actions>
                    <bookmark :questionId="question.questionId"> </bookmark>
          </v-card-actions>-->
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import LikeBtn from "../components/Likes.vue";
// import Bookmark from "../components/Bookmark.vue"
import PageHeader from "../components/Header"

export default {
  name: "answers",
  components: {
    // Bookmark,
    LikeBtn,
    PageHeader,
  },

  data() {
    return {
      answering: false,
      userAnswer: "",
      answers: [],
      question: {},
      message: "",

      questionId: this.$route.params.id
    };
  },
  methods: {
    postAnswer: function() {
      axios
        .request({
          method: "POST",
          url: "http://127.0.0.1:5000/api/answers",
          data: {
            loginToken: cookies.get("session"),
            questionId: this.questionId,
            content: this.userAnswer
          }
        })
        .then(response => {
          console.log(response);
          this.userAnswer = ""
          this.message = "Answer successfully posted!"
        })
        .catch(error => {
          console.log(error);
        });
    },

    getAnswer: function() {
      axios
        .request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/answers",
          params: {
            questionId: this.questionId
          }
        })
        .then(response => {
          this.answers = response.data;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    showQuestion: function() {
      axios
        .request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/questions",
          params: {
            questionId: this.questionId
          }
        })
        .then(response => {
          console.log(response);
          this.question = response.data[0];
        })
        .catch(error => {
          console.log(error);
        });
    },

    toAnswer: function() {
      this.$router.push({ name: "answers-page" });
      this.showingAnswer = true;
    },

    goDiscover: function() {
      this.$router.push({ name: "discover-page" });
    }
  },

  mounted() {
    this.showQuestion();
    this.getAnswer();
  }
};
</script>

<style lang="sass" scoped>
</style>