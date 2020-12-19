<template>
    <div>
        <v-app-bar>
            <v-btn>Profile</v-btn>
            <v-spacer></v-spacer>
            <v-bt>Discover</v-bt>
            <v-spacer></v-spacer>
            <v-btn>Bookmarks</v-btn>
            <v-spacer></v-spacer>
            <v-btn>Logout</v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "header",
        methods: {
            goProfile: function() {
                this.$router.push({name: "profile-page"})
            },

            goDiscover: function() {
                this.$router.push({name: "discover-page"})
            },

            goBookmarks: function() {
                this.$router.push({name: "bookmarks-page"})
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