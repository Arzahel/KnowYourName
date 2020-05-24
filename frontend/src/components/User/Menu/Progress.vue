<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(card, index) in cards"
          :key="card.title"
          :cols="2"
          :id=index
        >

          <v-card height="180px" class="achievment" @click="changeColor(this)">
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
      }
    }

  }
</script>