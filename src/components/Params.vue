<script setup>
import Graphik from "@/components/Graphik.vue";
import {ref} from "vue";

const props = defineProps(['params']);

const paramOpenId = ref('');
</script>

<template>
  <div v-if="params.length > 0" class="params">
    <v-btn v-for="(item, i) in params" :key="`param-${i}`" @click="paramOpenId = i">
      {{item.name}}
    </v-btn>
  </div>
  <template v-for="(item, i) in params" :key="`param-${i}-block`">
    <div :id="`param-${i}`" class="param-block" :class="{open: paramOpenId === i}">
      <div>
        <div v-if="item.values.length > 0">
          <div v-for="(value, i) in item.values">
            <span>{{ value.time }}</span>
            <span>{{ value.result }}</span>
          </div>
        </div>
        <div v-else>
          К сожалению, недостаточно замеров по данному параметру
        </div>
        <v-btn @click="paramOpenId = ''">Закрыть</v-btn>
      </div>
      <div v-if="item.name.toLowerCase() !== 'давление' && i === params.length - 1">
        <Graphik :data="[{time: '16.11.2024 18:09:03', result: '120'},{time: '16.11.2024 19:09:03', result: '80'},{time: '16.11.2024 17:09:03', result: '100'},{time: '16.11.2024 18:12:03', result: '90'},]"/>
      </div>
      <div v-if="item.values.length > 0">
        <h3>Динамика:</h3>
        <Graphik :data="item.values"/>
      </div>
    </div>
  </template>
</template>

<style scoped>
.params {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.param-block {
  position: relative;
  display: grid;
  gap: 20px;
  height: 0;
  overflow: hidden;
}

.param-block.open {
  padding: 20px;
  height: auto;
  background-color: rgb(30,30,30);
  border-radius: 15px;
}

.param-block > div:first-child {
  display: flex;
  justify-content: space-between;
}

.param-block > div > div {
  display: grid;
  gap: 20px;
  align-items: center;
}

.param-block > div > div > div {
  display: flex;
  gap: 10px;
}
</style>
