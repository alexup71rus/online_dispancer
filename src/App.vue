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

    <!-- Основной контент -->
    <v-main>
      <v-container>
        <RouterView /> <!-- Здесь будет меняться содержимое в зависимости от маршрута -->
      </v-container>
    </v-main>

    <!-- Футер -->
    <v-footer app color="grey lighten-2" style="background-color: #BB86FC !important;;">
      <div class="footer">
        <div style="display: grid;line-height: 1.1em !important;color: #1e1e1e">
          <span>© 2024</span>
          <span>Булочки мечты</span>
        </div>
        <v-spacer></v-spacer>
        <img src="@/assets/logo.svg" alt="">
        <v-spacer></v-spacer>
        <v-btn :style="{opacity: `${route.fullPath !== '/' ? 1 : 0}`}" text to="/" style="font-size: 12px;background-color: rgb(80,80,80) !important;border: 1px solid #1e1e1e;">Назад</v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<style>
.v-toolbar__content > .v-toolbar-title {
  margin-left: 0 !important;
}
.v-toolbar {
  background-color: unset !important;
}

h1 {
  font-size: 14px;
  max-width: 100%;
}
div {
  font-size: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.footer img {
  width: 40px;
  height: 40px;
}
</style>
