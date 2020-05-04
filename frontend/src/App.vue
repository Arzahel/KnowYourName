<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>

      <v-btn
        @click="logonOpen()"
        target="_blank"
        text
      >
        <span class="mr-2">Уваход</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
//import AdminHome from './components/AdminHome.vue';
//import UserHome from './components/UserHome.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
    LoginForm,
  },
  methods: {
  logonOpen(){
    this.$router.push({name: 'logon'})
  }  
}
  //data: () => ({}),
};
</script>
