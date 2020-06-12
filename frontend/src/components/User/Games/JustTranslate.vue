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
            <div style="font-size:32px; float:center; text-align:center" class="justify-center">Гульня</div>
        </v-app-bar>
        <v-card
        class="d-flex align-center justify-center pa-4 mx-auto"
        max-width="720"
        min-height="200"
        outlined
        >
            <v-row dense>
                <div min-height="100"
                class="justify-center text-center"
                style="font-size:24px; text-align:center"
                >
                    {{displayAnswer}}
                </div>
                
            </v-row>
            <v-divider></v-divider>
            <v-row dense no-gutters style="float:center" class="justify-center">
                <v-col
                    v-for="word in currentWords"
                    :key="word"
                    :cols="3"
                >
                    <v-card link min-height="100" class="justify-center text-center" style="font-size:24px; text-align:center; background:#fff5d7"
                    @click="checkAnswer(this.textContent)"
                    >
                        {{word.text}}
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
    
<script>
import axios from 'axios'

export default {
    data: () => ({
      dictionary: null,
      currentWords: [{text: 'Лыжка'}, {text: 'Дзюба'}, {text:'Кветка'}],
      displayAnswer: 'Ложка',
      currentAnswer: null,
      correctAnswer: 'Лыжка',
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
            alert(answer);
            if (answer != this.currentAnswer) this.refreshWords();
            else {
                this.counter+=1;
                this.refreshWords();
            }
        },
        toUserHome(){
            this.$router.push({name: 'user', params: {id: '102'} })
        }
    }
}
</script>