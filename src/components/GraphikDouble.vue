<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps(['data']);

const timesDouble = ref([]);
const valuesDouble = ref([]);

const graphicDataDouble = computed(() => {
  return props.data.sort((item1, item2) => {
    let time1 = getDate(item1.time),
      time2 = getDate(item2.time);

    if (time1 > time2) {
      return 1;
    }

    if (time1 < time2) {
      return -1;
    }

    return 0;
  }) ?? [];
});

function getDate(time) {
  let dataArray = time.split(/(\s|\.|:)+/);

  return new Date(dataArray[4], dataArray[2], dataArray[0], dataArray[6], dataArray[8]);
}

function setTimesAndValues() {
  graphicDataDouble.value.forEach((item, i) => {
    timesDouble.value.push(props.data[i].time);
    valuesDouble.value.push(props.data[i].result);
  });
}

function getTimeIndex(time) {
  return graphicDataDouble.value.findIndex((item) => item.time === time);
}

function getValueIndex(timeIndex) {

  return valuesDouble.value.findIndex((item) => item === graphicDataDouble.value[timeIndex].result);
}


function sortValues() {
  valuesDouble.value = valuesDouble.value.sort((item1, item2) => {
    if (Number(item1) > Number(item2)) {
      return 1;
    }

    if (Number(item1) < Number(item2)) {
      return -1;
    }

    return 0;
  });
}

onMounted(() => {
  setTimesAndValues();
  sortValues();
});
</script>

<template>
  <div class="graphic" :style="{
    height: `${graphicDataDouble.length * 40}px`
  }">
    <template v-for="(time, i) in timesDouble" :key="`graphic-double-${i}`">
      <div v-if="getTimeIndex(timesDouble[i]) > -1" class="graphic__item" :style="{
        height: `${(getValueIndex(i) + 1) * 40}px`,
        width: `calc(100% / ${timesDouble.length} * ${timesDouble[i - 1] === time && i > 0 ? i : i + 1} - ${timesDouble[i - 1] === time && i > 0 ? 69 : 80}px)`,
      }">
        <div>
          <span></span>
        </div>
      </div>
    </template>
    <div v-for="(value, i) in valuesDouble" :key="`value-double-${i}`" :style="{
      height: `${(i + 1) * 40}px`
    }" class="graphic__value">
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<style scoped>
.graphic {
  position: relative;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
}

.graphic::before {
  content: '';
  position: absolute;
  display: block;
  height: 100%;
  width: 1px;
  background-color: rgb(60,60,60);
  bottom: 0;
  left: 50px;
}

.graphic::after {
  content: '';
  position: absolute;
  display: block;
  height: 1px;
  width: calc(100% - 50px);
  background-color: rgb(60,60,60);
  bottom: 0;
  left: 50px;
}

.graphic__item {
  position: absolute;
  bottom: 0;
  left: 50px;
  display: flex;
  justify-content: end;
}

.graphic__value {
  position: absolute;
  bottom: 0;
  left: 50px;
}

.graphic__value p {
  transform: translateX(calc(-100% - 10px)) translateY(-50%);
  max-width: 70px;
}

.graphic__item > div {
  width: 100%;
  display: flex;
  justify-content: end;
  border-top: 1px dashed rgb(45,45,45);
}

.graphic__item span {
  background-color: #3E94D1;
  border: 1px solid #fff;
  width: 10px;
  height: 100%;
  opacity: 60%;
}
</style>
