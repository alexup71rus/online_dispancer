<script setup>
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
      <div v-if="item.values.length > 0">
        <h3>Динамика:</h3>

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

.param-block > div {
  display: flex;
  justify-content: space-between;
  background-color: rgb(30,30,30);
  border-radius: 15px;
  height: 0;
  overflow: hidden;
}

.param-block.open > div {
  padding: 20px;
  height: auto;
}


.param-block > div > div {
  display: grid;
  gap: 20px;
  align-items: center;
}
</style>
