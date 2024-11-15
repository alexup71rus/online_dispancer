<script setup>
import {RouterView, useRoute} from 'vue-router';
import {computed} from "vue";

const route = computed(() => useRoute());
</script>

<template>
  {{ currentPage }}
  <v-app>
    <!-- Хедер -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Online Dispancer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="route.fullPath !== '/'" text to="/">Назад</v-btn>
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
        <span>© 2024 Булочки мечты</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
</style>
