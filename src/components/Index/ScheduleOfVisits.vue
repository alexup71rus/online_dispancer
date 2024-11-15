<script setup>
import { ref } from "vue";

const props = defineProps(['title']);

const date = new Date();
const attributes = ref([
  {
    highlight: true,
    dates: date,
  },
]);

// Пример события с временем
const events = ref([
  {
    start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0), // 10:00
    end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 30),   // 12:00
    title: 'Приём у врача'
  }
]);

</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>

  <VCalendar
    expanded
    is-dark="true"
    :attributes="attributes"
  />

  <div class="time" v-for="event in events" :key="event.title">
    <p>{{ event.title }}: {{ event.start.toLocaleTimeString() }} - {{ event.end.toLocaleTimeString() }}</p>
  </div>

</template>

<style scoped>
.v-toolbar {
  background-color: unset !important;
}
.time {
  margin-top: 20px;
}
</style>
