<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            ---Cookie 유치원---
          </v-list-item-title>
          <v-list-item-subtitle
            ><b> {{ name }}</b
            >님 환영합니다.</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div>
        <br /><br /><br />
        <img src="@/image/kindergarden.png" width="230" height="230" />
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar src="@/image/dot.png">
        <v-toolbar-title aligh="center"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="logout">logout</v-icon>
        </v-btn>
      </v-toolbar>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", to: "/about" },
        { title: "게시판", icon: "mdi-clipboard-edit-outline", to: "/board" },
        { title: "회원 정보수정", icon: "person", to: "/user" },
        { title: "Album", icon: "mdi-film", to: "/album" },
        { title: "오늘의 식단", icon: "mdi-silverware", to: "/custom" },
      ],
      right: null,
    };
  },

  methods: {
    ...mapActions({ setToken: "user/setToken" }),
    logout() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.setToken("");
      }
    },
  },

  computed: {
    ...mapGetters("user", ["name"]),
  },
};
</script>

<style scoped></style>
