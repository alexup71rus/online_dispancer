<script setup>
import {computed, inject, ref, watch} from "vue";

const props = defineProps(['title']);

const apiService = inject('apiService');

const checkups = computed(() => apiService.state.data.checkups);

const list = computed(() => {
  let result = [];

  if (checkups.value !== undefined) {
    result = checkups.value.reduce(function (acc, current) {
      if (current.type === 'medicine') {
        const timeIncludesIndex = acc.findIndex((item) => item.time === current.start_at) ?? null;

        if (timeIncludesIndex >= 0) {
          acc[timeIncludesIndex].info.push({
            id: current.id,
            description: current.description,
            status: current.status
          });
        } else {
          acc.push({
            time: current.start_at,
            info: [
              {
                id: current.id,
                description: current.description,
                status: current.status
              }
            ]
          });
        }
      }

      return acc;
    }, []);
  }

  return result;
});

function setStatusText(status) {
  let text = '';

  switch (status) {
    case 'not-started':
      text = 'Предстоит выполнить';
      break;
    case 'in-progress':
      text = 'Необходимо выполнить рекоммендацию';
      break;
    case 'finished':
      text = 'Выполнено';
      break;
    case 'fail':
      text = 'Не выполнено';
      break;
  }

  return text;
}

function setStatusColor(status) {
  let color = '';

  switch (status) {
    case 'not-started':
      color = 'gray';
      break;
    case 'in-progress':
      color = 'yellow';
      break;
    case 'finished':
      color = 'green';
      break;
    case 'fail':
      color = 'red';
      break;
  }

  return color;
}

function parseTime(time) {
  let timeArray = time.split(/(T|-|\.)+/);

  console.log(timeArray)

  return `${timeArray[4]}.${timeArray[2]}.${timeArray[0]} ${timeArray[6]}`;
}
</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>

  <div v-if="list.length > 0" class="schedule__list">
    <div v-for="(item, i) in list" :key="i" class="schedule__item">
      <h3>{{ parseTime(item.time) }}</h3>
      <div class="schedule__info">
        <div v-for="(infoItem, i) in item.info" :key="`inf0-${i}`" :class="`${setStatusColor(infoItem.status)}`">
          <p>{{ infoItem.description }}</p>
          <span>{{ setStatusText(infoItem.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-toolbar {
  background-color: unset !important;
}

.schedule__list {
  display: grid;
  gap: 35px;
  margin-top: 40px;
}

.schedule__item {
  display: grid;
  gap: 15px;
}

.schedule__info {
  display: grid;
  gap: 20px;
}

.schedule__info > div {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
}

.schedule__info > div.yellow p {
  background-color: #BFA730;
}

.schedule__info > div.yellow span {
  color: #FFE900;
}

.schedule__info > div.green p {
  background-color: #64AA2B;
}

.schedule__info > div.green span {
  color: #369100;
}

.schedule__info > div.red p {
  background-color: #BF3030;
}

.schedule__info > div.red span {
  color: #FF4040;
}

.schedule__info p {
  padding: 20px;
  background-color: rgb(60, 60, 60);
  border-radius: 15px;
}

.schedule__info span {
  margin-left: 20px;
  color: rgb(80, 80, 80);
}
</style>
