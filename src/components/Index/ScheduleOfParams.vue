<script setup>
import Schedule from "@/components/Schedule.vue";
import Params from "@/components/Params.vue";
import {computed, inject} from "vue";
import {prepareParams, prepareSchedule} from "@/api/medicinePrepareFunctions.js";

const props = defineProps(['title']);

const apiService = inject('apiService');

const checkups = computed(() => apiService.state.data.checkups);

const scheduleList = computed(() => {
  let result = [];

  if (checkups.value !== undefined) {
    result = prepareSchedule(checkups.value, 'measurements');
  }

  return result;
});

const paramsList = computed(() => {
  let result = [];

  if (checkups.value !== undefined) {
    result = prepareParams(checkups.value);
  }

  return result;
});

</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>

  <Params :params="paramsList" />

  <Schedule :list="scheduleList" />
</template>
