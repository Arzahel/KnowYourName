<template>
    <v-container fluid class="justify-center">
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
        <div style="font-size:32px; margin-left:50px">Практыкаванне</div>
      </v-app-bar>

      <v-container
      min-height="600"
      outlined
      >
              <div min-height="100"
              class="justify-center text-center"
              style="font-size:24px; text-align:center"
              >
                  {{currentExample}}
              </div>
              <p style="font-size:24px" justify="right">Лiк: {{counter}}</p>
              <v-divider></v-divider>

              <v-list no-gutters class="justify-center" style="margin-top:20px">
                <v-list-item>
                  Абярыце правільны варыянт адказу:
                </v-list-item>
                <v-list-item
                v-for="answer in displayAnswers"
                :key="answer"
                :cols="3"
                >
                    <v-card link min-width="100" min-height="100" class="justify-center text-center"
                    style="font-size:24px; text-align:center; background:#fff5d7"
                    @click="checkAnswer(answer.text)"
                    >
                      {{answer.text}}
                    </v-card>
                </v-list-item>
              </v-list>
              
      </v-container>
    </v-container>
</template>
    
<script>
import axios from 'axios'

export default {
    data: () => ({
      dictionary: null,
      currentExample: 'У вав_ркі хуткі_ лапкі.',
      displayAnswers: [{text: 'ё, я'}, {text: 'е, е'}, {text:'ё, у'}],
      correctAnswer: 'ё, я',
      counter: 0
    }),
    methods: {
        getDictionary(){
            axios.get(this.backendRoute + '/dictionary:id')
            .then(function (response) {
                this.dictionary = response;
            })
            this.counter=0
        },
        refreshWords(){
            
        },
        mounted: function(){
            this.getDictionary();           
        },
        checkAnswer(answer){
            if (answer == this.correctAnswer) {
              this.counter+=1;
              alert("Вы адказалi правiльна!");
            } else alert("Памылка. Правiльны адказ - " + this.correctAnswer)
            this.refreshWords();
        },
        toUserHome(){
            this.$router.push({name: 'user', params: {id: '102'} })
        }
    }
}
</script>