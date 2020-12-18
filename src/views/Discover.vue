<template>
    <div>
        <div v-for="question in questions" :key="question.id">
            <v-card width="500" class="mx-auto mt-5">
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
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn>Answers</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn>Bookmark</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn>Answer</v-btn>
                </v-card-actions>
            </v-card>

        </div>

    </div>
</template>

<script>
import axios from 'axios'


    export default {
        name: "discovery-page",
        components: {
       
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
                    this.questions = response.data
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