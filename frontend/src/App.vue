<template>
  <v-app>
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

var backendPort = "http://localhost:3000"

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
