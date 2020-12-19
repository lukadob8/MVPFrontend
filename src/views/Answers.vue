<template>
    <div>
        <v-btn>Answers</v-btn>
        <!-- <v-card>
            <v-card-title>
                   Subject: {{ question.title }}
                </v-card-title>
                <v-card-subtitle>
                   Asked by: {{ question.username }}
                </v-card-subtitle>
                <v-card-text>
                   Question: {{ question.content }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  Asked On: {{ question.createdAt }}
                </v-card-text>
        </v-card>
        <div v-for="answer in answers" :key="answer.id">
            <v-card width="500" class="mx-auto mt-5">
                <v-card-title>
                   Answer: {{ answer.content}}
                </v-card-title>
                <v-card-subtitle>
                   Answered by: {{ answer.username }}
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-subtitle>
                  Answered On: {{ answer.createdAt }}
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-actions>
                    <bookmark :questionId="question.questionId"> </bookmark>
                </v-card-actions>
            </v-card>

        </div>
        <v-btn v-if="answering == false" @click="answering = !answering">Answer</v-btn>
        <v-input v-if="answering == true">
            <v-text-field v-model="userAnswer"></v-text-field>
            <v-divider></v-divider>
            <v-btn>Submit</v-btn>
        </v-input> -->

    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
// import Bookmark from "../components/Bookmark.vue"

    export default {
        name: "answers",
        components: {
            // Bookmark,
        },
        props: {
            questionId: Number,
        },
        data() {
            return {
                answering: false,
                userAnswer: "",
                answers: [],
                question: {},
            }
        },
        methods: {
            postAnswer: function() {
                axios.request({
                    method: "POST",
                    url: "http://127.0.0.1:5000/api/answers",
                    data: {
                        loginToken: cookies.get("session"),
                        questionId: this.questionId,
                        content: this.userAnswer
                    }
                })
            },

            getAnswer: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/answers",
                    params: {
                        questionId: this.questionId
                    }
                }).then((response) => {
                    this.answers = response.data
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            },

            showQuestion: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/questions",
                    params: {
                        questionId: this.questionId
                    }
                }).then((response) => {
                    console.log(response)
                    this.question = response.data[0]
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>