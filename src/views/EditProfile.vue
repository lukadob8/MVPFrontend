<template>
    <div>
        <page-header />
        <br>
        <v-card-actions>
            <v-btn v-if="editing == false" @click="editing = !editing">Edit Profile</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="deleting == false" @click="deleting = !deleting">Delete Profile</v-btn>
        </v-card-actions>
        <v-card width="600" class="mx-auto mt-5" v-if="editing == true">
          <v-card-title>
              <h1 class="display-1">Enter Fields you wish to edit below.</h1>
          </v-card-title>
          <v-card-text>
              <v-form>
                  <v-text-field label="Email" v-model="email"></v-text-field>
                  <v-text-field label="Username" v-model="username"></v-text-field>
                  <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                  <v-text-field label="Birthdate" v-model="birthdate"></v-text-field>
              </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn @click="editProfile()">Edit</v-btn>
          </v-card-actions>
      </v-card>
      <v-card width="600" class="mx-auto mt-5" v-if="deleting == true">
          <v-card-title>
              <h1 class="display-1">To delete enter your password.</h1>
          </v-card-title>
          <v-card-text>
              <v-form>
                  <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
              <v-btn @click="deleteProfile()">Delete</v-btn>
          </v-card-actions>
      </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import PageHeader from "../components/Header.vue"

    export default {
        name: "edit-profile",
        components: {
            PageHeader,
        },
        data() {
            return {
                email: "",
                username: "",
                password: "",
                birthdate: "",
                editing: false,
                deleting: false,
            }
        },
        methods: {
            editProfile: function() {
                axios.request({
                    method: "PATCH",
                    url: "http://127.0.0.1:5000/api/users",
                    data: {
                        loginToken: cookies.get("session"),
                        email: this.email,
                        username: this.username,
                        password: this.password,
                        birthdate: this.birthdate
                    }
                }).then((response) => {
                    console.log(response)
                    this.editing = false
                }).catch((error) => {
                    console.log(error)
                })
            },

            deleteProfile: function() {
                axios.request({
                    method: "DELETE",
                    url: "http://127.0.0.1:5000/api/users",
                    data: {
                        loginToken: cookies.get("session"),
                        password: this.password
                    }
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>