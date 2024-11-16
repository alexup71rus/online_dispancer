<script setup>
import {prepareTime, setStatusColor, setStatusText} from "@/api/medicinePrepareFunctions.js";

const props = defineProps(['list']);
</script>

<template>
  <div v-if="list.length > 0" class="schedule__list">
    <div v-for="(item, i) in list" :key="i" class="schedule__item">
      <h3>{{ prepareTime(item.time) }}</h3>
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
  color: #fff;
  border-radius: 15px;
}

.schedule__info span {
  margin-left: 20px;
  color: rgb(80, 80, 80);
}
</style>
