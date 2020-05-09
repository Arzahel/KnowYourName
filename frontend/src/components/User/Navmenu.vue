<template>
        <v-navigation-drawer
          permanent
          expand-on-hover
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img :src="require('../../assets/avatar_default.png')"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">Карыстальнік</v-list-item-title>
                <v-list-item-subtitle>0</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Дасягненні</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Прагрэс</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Налады</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Navmenu',
    user: {
      name: String,
      accountLevel: Number
    }
  }
</script>