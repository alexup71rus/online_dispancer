<script setup>
import {RouterView, useRoute} from 'vue-router';
import {computed, onMounted, provide} from "vue";
import {apiService} from "@/api/ApiService.js";

const route = computed(() => useRoute());

provide('apiService', apiService);

onMounted(async () => {
  await apiService.fetchData();
});

</script>

<template>
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
