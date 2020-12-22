<template>
    <div>
        <v-card>
            <v-card-text>Likes: {{likesNum}}</v-card-text>
            <v-card-actions>
                <v-btn v-if="isLiked == false" @click="postLike()" class="orange lighten-3">Like</v-btn>
                <v-btn v-if="isLiked == true" @click="removeLike()" class="orange lighten-3">Unlike</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"

    export default {
        name: "likes",
        props: {
            answerId: Number,
        },
        data() {
            return {
                isLiked: false,
                likesNum: 0,
                answersLiked: []
            }
        },
        methods: {
            postLike: function() {
                this.isLiked = true
                axios.request({
                    method: "POST",
                    url: "http://127.0.0.1:5000/api/likes",
                    data: {
                        loginToken: cookies.get("session"),
                        answerId: this.answerId
                    }
                }).then((response) => {
                    this.likesNum++
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            },

            removeLike: function() {
                this.isLiked = false
                axios.request({
                    method: "DELETE",
                    url: "http://127.0.0.1:5000/api/likes",
                    data: {
                        loginToken: cookies.get("session"),
                        answerId: this.answerId
                    }
                }).then((response) => {
                    console.log(response)
                    this.likesNum--
                }).catch((error) => {
                    console.log(error)
                })
            },

            getLikes: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/likes",
                    params: {
                        answerId: this.answerId
                    }
                }).then((response) => {
                    console.log(response)
                    this.answersLiked = response.data
                    this.likesNum = this.answersLiked.length - 1
                    let currentUser = cookies.get("userId")
                    for(let i = 0; i < this.answersLiked.length; i++) {
                        if(currentUser == this.answersLiked[i].userId) {
                            this.isLiked = true
                            return
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
        mounted () {
            this.getLikes();
        },
    }
</script>

<style lang="sass" scoped>

</style>