<template>
    <v-container fluid>
      <v-app-bar
      app
      color="primary"
      dark
      >
        <v-btn
            left
            @click="toUserHome()"
            target="_blank"
            text
        >
          <span class="mr-2">Назад</span>
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-btn>
        <!--<v-spacer></v-spacer>-->
        <div style="font-size:32px; margin-left:50px" >Прагрэс</div>
      </v-app-bar>

      <v-row dense>
        <v-col
          v-for="(card, index) in cards"
          :key="card.title"
          :cols="2"
          :id=index
        >
          <v-card height="180px" class="achievment" @click="openExercise()">
            <v-card-title style="font-size:28px; text-align:center">{{card.title}}</v-card-title>
            <p style="padding:6px; font-size:16px" v-text="card.description"></p>
          </v-card>
        </v-col>
      </v-row>
      
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Частка 1: ', description: "правапіс галосных" },
        { title: 'Частка 2: ', description: "правапіс зычных" },
        { title: 'Частка 3: ', description: "мяккі знак і апостраф" },
      ],
    }),
    methods:{
      changeColor(el){
        el.style.background = 'green';
      },
      toUserHome(){
        this.$router.push({name: 'user', params: {id: '102'} })
      },
      openExercise(){
        this.$router.push({name: 'exercise', params: {id: '102'} })
      }
    }

  }
</script>