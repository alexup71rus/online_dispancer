<script setup>
import {computed, inject, ref} from "vue";
import {prepareParams} from "@/api/medicinePrepareFunctions.js";
import {sendSummaryRequest} from "@/api/summary.js";

const apiService = inject('apiService');

const summary = ref('');

const checkups = computed(() => apiService.state.data.checkups);

const paramsList = computed(() => {
  let result = [];

  if (checkups.value !== undefined) {
    result = prepareParams(checkups.value);
  }

  return result;
});

async function checkSummary() {
  if (paramsList.value.length > 0) {
    let patientData = '';

    paramsList.value.forEach((param) => {
      if (param.values.length > 0) {
        patientData += `Показатель "${param.name}" за последние дни:\n`;

        param.values.forEach((value) => {
          patientData += `${value.time}: ${value.result}\n`;
        });

        patientData += "\n\n";
      }
    });

    summary.value = await sendSummaryRequest({
      patient_data: patientData,
    });
  } else {
    summary.value = 'Сервис временно недоступен.'
  }
}

</script>

<template>
  <section class="summary">
    <v-btn style="font-size: 12px;background-color: rgb(40,40,40);" @click="checkSummary">
      Получить самари
    </v-btn>
    <div v-if="summary.length > 0" style="margin-top: 30px">
      {{ summary }}
    </div>
  </section>
</template>

<style>
.summary {
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgb(30,30,30);
}
</style>
