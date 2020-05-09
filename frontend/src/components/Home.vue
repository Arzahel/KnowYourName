<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/Movaznauchik_256x228.png')"
          class="my-3"
          contain
          height="228"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Вiтаем у веб-прыладзе "Даведнiк Будучага Мовазнаўцы"
        </h1>

        <p class="subheading font-weight-regular">
          Гэта куток для ўсіх, хто шануе беларускую мову і хоча вывучыць яе ў лёгкай форме.
          <br>Каб працягнуць, 
          <a
            @click="logonOpen()"
            target="_blank"
          >увайдзіце ў лічны кабінет.</a>
          Калі вы яшчэ не зарэгістрыраваліся, гэта можна зрабіць
          <a
            @click="registerOpen()"
            target="_blank"
          >тут.</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Што далей?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {

    name: 'Home',
    methods: {
      logonOpen(){
        this.$router.push({name: 'logon'})
      },
      registerOpen(){
        this.$router.push({name: 'register'})
      }  
    }

  }
</script>
