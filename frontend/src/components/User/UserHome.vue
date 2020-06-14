<template>
  <v-container>
    <v-row class="row-left" style="width:20%; float:left; overflow:auto">
      <v-navigation-drawer
          permanent
        >
        <v-list style="text-align:center;">
            <v-list-item class="px-2" justify="center" style="margin-left:40%">
              <v-list-item-avatar>
                <v-img :src="require('../../assets/avatar_default.png')"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">Карыстальнік</v-list-item-title>
                <v-list-item-subtitle >0</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link @click="openAchievments()">
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Дасягненні</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openProgress()">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Прагрэс</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openMaterials()">
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Матэрыялы</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Налады</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-row>

    <v-row class="row-right" style="width:80%; float:right; overflow:auto">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3" style="text-align:center">
          Вітаем, Карыстальнік!
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3" style="text-align:center">
          Штодзённыя заданні
        </h2>
        <v-row justify="left">
          <v-card height="180px" max-width="350px" link @click="openActivity()">
            <v-card-title style="font-size:28px; text-align:center">Размінка</v-card-title>
            <p style="padding:6px; font-size:16px">Атрымай крыху вопыта ў штодзённай гульні</p>
          </v-card>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3" style="text-align:center">
          Падзеі
        </h2>

        <v-row justify="left">
          <v-card height="180px" max-width="350px" link @click="openActivity()">
            <v-card-title style="font-size:28px; text-align:center">Адпачынак улетку</v-card-title>
            <p style="padding:6px; font-size:16px">Прыйшла пара сонца, усмешак i вялiкiх канiкул. Даведайся, як правiльна размаўляць на мове ў гэты час.</p>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 // import Navmenu from '../User/Navmenu.vue';

  export default {

    name: 'UserHome',
    components: {
    //Navmenu,
    },
    methods: {
      openAchievments(){
       this.$router.push({name: 'achievments', params: {id: '102'} })
      },
      openProgress(){
       this.$router.push({name: 'progress', params: {id: '102'} })
      },
      openActivity(){
       this.$router.push({name: 'translate', params: {id: '102'} })
      },
      openMaterials(){
       this.$router.push({name: 'materials', params: {id: '102'} })
      }
    }

  }
</script>
