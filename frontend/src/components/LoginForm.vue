<template>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card id="vueApp" class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Форма увахода</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Падказка</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user.name"
                    label="Iмя карыстальнiка"
                    id="username"
                    prepend-icon=""
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon=""
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="logonAttempt()">Уваход</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import axios from 'axios';
export default {

data: () => ({
    user: {
      name: null,
      password: null,
    },
}),

methods: {
  logonAttempt(){
    axios.post('http://localhost:3000/logon', {
      username: document.getElementById("username").innerText,
      password: document.getElementById("password").innerText
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if (this.status == 200) {
        this.$router.push({name: 'user', params: {id: '102'} })
      }
    }
  }
}
</script>