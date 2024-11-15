<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <!-- Хедер -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Online Dispancer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Главная</v-btn>
      <v-btn text to="/about">О проекте</v-btn>
    </v-app-bar>

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <RouterView /> <!-- Здесь будет меняться содержимое в зависимости от маршрута -->
      </v-container>
    </v-main>

    <!-- Футер -->
    <v-footer app color="grey lighten-2">
      <v-container>
        <span>© 2024 Моя компания</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
</style>
