<script setup>
import GraphikDouble from "@/components/GraphikDouble.vue";
import {computed, onMounted, ref} from "vue";

const props = defineProps(['data']);

const times = ref([]);
const values = ref([]);
const doubleData = ref([]);

const graphicData = computed(() => {
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
  graphicData.value.forEach((item, i) => {
    times.value.push(props.data[i].time);
    if (props.data[i].result.includes('/')) {
      let valueData = props.data[i].result.split('/');
      doubleData.value.push({
        time: props.data[i].time,
        result: valueData[1],
      })
      values.value.push(valueData[0]);
    } else {
      values.value.push(props.data[i].result);
    }
  });
}

function getTimeIndex(time) {
  return graphicData.value.findIndex((item) => item.time === time);
}

function getValueIndex(timeIndex) {
  if (!graphicData.value[timeIndex]) {
    return -1;
  }

  return values.value.findIndex((item) => {
    if (graphicData.value[timeIndex].result.includes('/')) {
      return item === graphicData.value[timeIndex].result.split('/')[0];
    }
    return item === graphicData.value[timeIndex].result;
  });
}


function sortValues() {
  values.value = values.value.sort((item1, item2) => {
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
    height: `${graphicData.length * 40}px`
  }">
    <template v-for="(time, i) in times" :key="`graphic-${i}`">
      <div v-if="getTimeIndex(times[i]) > -1" class="graphic__item" :style="{
        height: `${(getValueIndex(i) + 1) * 40}px`,
        width: `calc(100% / ${times.length} * ${times[i - 1] === time ? i : i + 1} - ${times[i - 1] === time && i > 0 ? 69 : 80}px)`,
      }">
        <div>
          <span></span>
        </div>
      </div>
    </template>
    <div v-for="(value, i) in values" :key="`value-${i}`" :style="{
      height: `${(i + 1) * 40}px`
    }" class="graphic__value">
      <p>{{ value }}</p>
    </div>
  </div>
  <GraphikDouble v-if="doubleData.length > 0" :data="doubleData" />
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
  background-color: #BB86FC;
  border: 1px solid #fff;
  width: 10px;
  height: 100%;
  opacity: 60%;
}
</style>
