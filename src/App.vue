<template>
  <v-app>
    <v-card width="200" class="mx-auto mt-5" elevation="1" shaped="" outlined="" color="grey lighten-3">
      <v-card-title class="justify-center orange--text text--darken-4">
        uQuery
      </v-card-title>
      <v-card-subtitle class="text-center orange--text text--darken-4">
        POST questions GET answers 
      </v-card-subtitle>
    </v-card>
    <br>

    <v-main>
     <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
    
  },

  data: () => ({
    //
  })
};
</script>
