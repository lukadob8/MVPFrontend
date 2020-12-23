<template>
    <div>
        <page-header />
        <br>
        <v-card width="600" class="mx-auto mt-5">
            <v-card-title>Your Profile</v-card-title>
            <v-divider></v-divider>
            <v-card-text>email: {{ email }}</v-card-text>
            <v-card-text>username: {{ username }} </v-card-text>
            <v-card-text>birthdate: {{ birthdate }}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="toEdit()" class="orange lighten-3">Edit</v-btn>
            </v-card-actions>
        </v-card>
        <br>
        <user-questions> </user-questions>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import UserQuestions from "../components/UserQuestions.vue"
import PageHeader from "../components/Header.vue"

    export default {
        name: "profile-page",
        components: {
            UserQuestions,
            PageHeader,
        },
        data() {
            return {
                email: "",
                username: "",
                birthdate: "",
            }
        },
        methods: {
            showProfile: function() {
                axios.request({
                    method: "GET",
                    url: "http://127.0.0.1:5000/api/users",
                    params: {
                        userId: cookies.get("userId")
                    }
                }).then((response) => {
                    console.log(response)
                    this.email = response.data[0].email
                    this.username = response.data[0].username
                    this.birthdate = response.data[0].birthdate
                }).catch((error) => {
                    console.log(error)
                })
            },

            toEdit: function() {
                this.$router.push({name: "profile-edit"})
            }
        },
        mounted () {
            this.showProfile();
        },
    }
</script>

<style lang="sass" scoped>

</style>