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
                <v-toolbar-title>Форма рэгістрацыі</v-toolbar-title>
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
                    label="Iмя карыстальнiка"
                    name="login"
                    prepend-icon=""
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon=""
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    id="repeat-password"
                    label="Пароль яшчэ раз"
                    name="repeat-password"
                    prepend-icon=""
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="logonOpen()">Пацвердзіць</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
export default {

methods: {
  logonOpen(){
    this.$router.push({name: 'logon'})
  }
}

//document.getElementsByClassName('Icon Icon--bird bird-topbar-etched')[0].disabled  = true

}
</script>