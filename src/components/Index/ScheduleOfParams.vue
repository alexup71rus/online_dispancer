<script setup>
import Schedule from "@/components/Schedule.vue";
import Params from "@/components/Params.vue";
import {computed, inject} from "vue";
import {prepareSchedule, prepareTime} from "@/api/medicinePrepareFunctions.js";

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
    result = checkups.value.reduce(function (acc, current) {
      if (current.type === 'measurements') {
        const paramIncludesIndex = acc.findIndex((item) => item.name === parseDescription(current.description)) ?? null;

        if (paramIncludesIndex >= 0) {
          if (typeof current.checkup_data.value === "string" && current.checkup_data.value.length > 0) {
            acc[paramIncludesIndex].values.push({
              time: prepareTime(current.start_at),
              result: current.checkup_data.value,
            });
          } else if (typeof current.formattedValue === "string" && current.formattedValue.length > 0) {
            acc[paramIncludesIndex].values.push({
              time: prepareTime(current.start_at),
              result: current.formattedValue,
            });
          }
        } else {
          let values = [];
          if (typeof current.checkup_data.value === "string" && current.checkup_data.value.length > 0) {
            values.push({
              time: prepareTime(current.start_at),
              result: current.checkup_data.value,
            });
          } else if (typeof current.formattedValue === "string" && current.formattedValue.length > 0) {
            values.push({
              time: prepareTime(current.start_at),
              result: current.formattedValue,
            });
          }

          acc.push({
            name: parseDescription(current.description),
            values: values
          });
        }
      }

      return acc;
    }, []);
  }

  return result;
});

function parseDescription(text) {
  return text.split('"')[1] ?? '';
}

</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>

  <Params :params="paramsList" />

  <Schedule :list="scheduleList" />
</template>

<style scoped>
.v-toolbar {
  background-color: unset !important;
}
</style>
