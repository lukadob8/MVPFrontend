<template>
    <div>
        <page-header />
        <br>
        <h1 class="text-center">Most Recent Questions</h1>
        <div v-for="question in questions" :key="question.questionId">
            <v-card width="500" class="mx-auto mt-5">
                <v-card-text>
                   Subject: {{ question.title }}
                </v-card-text>
                <v-card-subtitle>
                   Asked by: {{ question.username }}
                </v-card-subtitle>
                <v-card-title>
                   Question: {{ question.content }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  Asked On: {{ question.createdAt }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="orange lighten-3" @click="$router.push({name: 'answers-page', params:{id:question.questionId}})">Answer</v-btn>
                    <v-spacer></v-spacer>
                    <bookmark :questionId="question.questionId"> </bookmark>
                </v-card-actions>
            </v-card>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
import Bookmark from '../components/Bookmark.vue'
import PageHeader from '../components/Header.vue'



    export default {
        name: "discovery-page",
        components: {
            Bookmark,
            PageHeader,
            
        },
        data() {
            return {
                questions: []
            }
        },
        methods: {
            showQuestions: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/questions",
                }).then((response) => {
                    console.log(response)
                    this.questions = response.data.reverse()
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted () {
            this.showQuestions();
        },
    }
</script>

<style lang="scss" scoped>

</style>