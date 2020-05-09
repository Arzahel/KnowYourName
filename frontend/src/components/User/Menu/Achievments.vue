<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="2"
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
        { title: 'Першыя крокі', description: "Прайсці першую частку Падарожжа" },
        { title: 'Шырокай хадой', description: "Прайсці другую частку падарожжа" },
        { title: 'Шпаркі', description: "Прайсці 3 раздзелы за 24 гадзіны ці менш" },
      ],
    }),
    methods:{
      changeColor(el){
        el.style.background = 'green';
      }
    }

  }
</script>