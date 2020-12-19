<template>
    <div>
        <v-btn @click="addBookmark()" v-if="isBookmarked == false">Bookmark</v-btn>
        <v-btn @click="removeBookmark()" v-if="isBookmarked == true">Remove</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "bookmarks",
        data() {
            return {
                bookmarks: [],
                isBookmarked: false,
                userId: cookies.get("userId")
            }
        },
        props: {
            questionId: {
                type: Number,
            }
        },
        methods: {
            addBookmark: function() {
                axios.request({
                    method: "POST",
                    url: "http://127.0.0.1:5000/api/bookmarks",
                    data: {
                        loginToken: cookies.get("session"),
                        questionId: this.questionId
                    }
                }).then((response) => {
                    this.isBookmarked = true
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            },

            removeBookmark: function() {
                axios.request({
                    method: "DELETE",
                    url: "http://127.0.0.1:5000/api/bookmarks",
                    data: {
                        loginToken: cookies.get("session"),
                        questionId: this.questionId
                    }
                }).then((response) => {
                    this.isBookmarked = false
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            },

            checkBookmarks: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/bookmarks",
                    params: {
                        loginToken: cookies.get("session")
                    }
                }).then((response) => {
                    console.log(response)
                    this.bookmarks = response.data

                    for(let i = 0; i < this.bookmarks.length; i++){
                        if(this.questionId == this.bookmarks[i].questionId) {
                            this.isBookmarked = true
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted () {
            this.checkBookmarks();
        },
    }
</script>

<style lang="sass" scoped>

</style>