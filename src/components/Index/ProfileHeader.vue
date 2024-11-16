<script setup>
import {computed, inject} from "vue";

const apiService = inject('apiService');

const fio = computed(() => {
  return `${apiService.state.data.last_name} ${apiService.state.data.name}`;
});

const info = computed(() => {
  return `${apiService.state.data.gender === 'female' ? 'Женщина. ' : 'Мужчина. '}${apiService.state.data.height > 0 ? 'Рост: ' + apiService.state.data.height + ' см. ' : ''}${apiService.state.data.weight > 0 ? 'Вес: ' + apiService.state.data.weight + ' кг.' : ''}`;
});
</script>

<template>
  <div class="profile-header">
    <v-avatar size="60px" color="surface-variant"></v-avatar>
    <div class="profile-info">
      <span>{{ fio }}</span>
      <span>{{ info }}</span>
    </div>
  </div>
</template>

<style lang="css">
 .profile-header {
   width: 100%;
   display: flex;
   justify-content: start;
   gap: 20px;
 }
 .profile-info {
   display: grid;
   gap: 10px;
 }
</style>
