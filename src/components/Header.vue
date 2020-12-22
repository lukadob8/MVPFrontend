<template>
    <div>
        <v-app-bar class="orange">
            <v-btn @click="goProfile()">Profile</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="goAsk()">Ask</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="goDiscover()">Discover</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="goBookmarks()">Bookmarks</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="logoutUser()">Logout</v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "page-header",
        methods: {
            goProfile: function() {
                this.$router.push({name: "profile-page"})
            },

            goDiscover: function() {
                this.$router.push({name: "discover-page"})
            },

            goBookmarks: function() {
                this.$router.push({name: "bookmarks"})
            },

            goAsk: function() {
                this.$router.push({name: "ask-page"})
            },

            logoutUser: function() {
                axios.request({
                    method: "DELETE",
                    url: "http://127.0.0.1:5000/api/login",
                    data: {
                        loginToken: cookies.get("session")
                    }
                }).then((response) => {
                    cookies.remove("session")
                    cookies.remove("userId")
                    console.log(response)
                    this.$router.push({name: "login-page"})
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>