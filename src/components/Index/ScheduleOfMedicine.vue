<script setup>
import {computed, inject} from "vue";
import Schedule from "@/components/Schedule.vue";
import {prepareSchedule} from "@/api/medicinePrepareFunctions.js";

const props = defineProps(['title']);

const apiService = inject('apiService');
const checkups = computed(() => apiService.state.data.checkups);

const scheduleList = computed(() => {
  let result = [];

  if (checkups.value !== undefined) {
    result = prepareSchedule(checkups.value, 'medicine');
  }

  return result;
});
</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>

  <Schedule :list="scheduleList" />
</template>

<style scoped>
.v-toolbar {
  background-color: unset !important;
}
</style>
