<template>
 
      <v-app>
          <signup-form />
      </v-app>
  
</template>

<script>
import SignupForm from "../components/SignupForm"
export default {
  name: "signup-page",
  components: {
      SignupForm,
  },
};
</script>

<style lang="scss" scoped></style>
