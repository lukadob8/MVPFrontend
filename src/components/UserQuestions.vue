<template>
  <div>
    <v-btn v-if="show == false" @click="userQuestions()">Your Questions</v-btn>
    <v-btn v-if="show == true" @click="show = false">Hide</v-btn>
    <div v-if="show == true">
      <div v-for="question in questions" :key="question.questionId">
        <v-card width="500" class="mx-auto mt-5">
          <v-card-title>Subject: {{ question.title }}</v-card-title>
          <v-card-subtitle>Asked by: {{ question.username }}</v-card-subtitle>
          <v-card-text>Question: {{ question.content }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text>Asked On: {{ question.createdAt }}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              @click="$router.push({name: 'answers-page', params:{id:question.questionId}})"
            >Answer</v-btn>
            <!-- <v-spacer></v-spacer>
            <bookmark :questionId="question.questionId"></bookmark> -->
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";


export default {
  name: "user-questions",
  data() {
    return {
      questions: [],
      show: false
    };
  },
  methods: {
    userQuestions: function() {
      axios
        .request({
          method: "GET",
          url: "http://127.0.0.1:5000/api/questions",
          params: {
            userId: cookies.get("userId")
          }
        })
        .then(response => {
          console.log(response);
          this.questions = response.data;
          this.show = true;
        })
        .catch(error => {
            console.log(error)
        });
    }
  }
};
</script>

<style lang="sass" scoped>
</style>