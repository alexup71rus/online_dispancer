<script setup>
import {onMounted, ref} from "vue";
import {SCHEDULE_OF_VISITS} from "@/data/sheduleOfVisits.js";

const props = defineProps(['title']);

const minDate = new Date();
const attributes = ref([]);
const info = ref([]);

const prepareDates = () => {
  SCHEDULE_OF_VISITS.forEach((item, i) => {
    attributes.value.push({
      key: i+1,
      highlight: {
        color: 'purple',
        fillMode: 'solid'
      },
      dates: new Date(item.year, item.month, item.day, item.hours, item.minutes),
    });
  });
};

const onDayClick = (day) => {
  if (day.attributes.length > 0) {
    const key = day.attributes[0].key - 1;

    info.value = [{
      title: 'Приём у врача',
      start: new Date(SCHEDULE_OF_VISITS[key].year, SCHEDULE_OF_VISITS[key].month, SCHEDULE_OF_VISITS[key].day, SCHEDULE_OF_VISITS[key].hours, SCHEDULE_OF_VISITS[key].minutes), // 10:00
      duration: `Продолжительность: ${SCHEDULE_OF_VISITS[key].duration}`,
      result: SCHEDULE_OF_VISITS[key].result ?? '',
    }];
  } else  {
    info.value = [];
  }
};

onMounted(() => {
  prepareDates();
});

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
    @dayclick="onDayClick"
  />

  <div v-if="info.length > 0" class="time">
    <p>{{ info[0].title }}: {{ info[0].start.toLocaleString() }}</p>
    <p>{{ info[0].duration }} минут</p>
    <p v-if="info[0].result.length > 0">Заключение: {{ info[0].result }}</p>
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
