<template>
    <div>
        <page-header />
        <br>
        <v-btn @click="getBookmarks()">Your Bookmarks</v-btn>
        <div v-for="bookmark in bookmarks" :key="bookmark.id">
            <v-card width="500" class="mx-auto mt-5">
                <v-card-title>
                   Subject: {{ bookmark.title }}
                </v-card-title>
                <v-card-subtitle>
                   Asked by: {{ bookmark.username }}
                </v-card-subtitle>
                <v-card-text>
                   Question: {{ bookmark.content }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  Asked On: {{ bookmark.createdAt }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn @click="$router.push({name: 'answers-page', params:{id:bookmark.questionId}})">Answer</v-btn>
                    <v-spacer></v-spacer>
                    <bookmark :questionId="bookmark.questionId"> </bookmark>
                    
                </v-card-actions>
            </v-card>

        </div>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
import Bookmark from "../components/Bookmark.vue"
import PageHeader from "../components/Header.vue"

    export default {
        name: "show-bookmarks",
        data() {
            return {
                bookmarks: [],
            }
        },
        components: {
            Bookmark,
            PageHeader,
        },
        methods: {
            getBookmarks: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/bookmarks",
                    params: {
                        loginToken: cookies.get("session")
                    }
                }).then((response) => {
                    console.log(response)
                    this.bookmarks = response.data
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>