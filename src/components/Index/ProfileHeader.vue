<script setup>

</script>

<template>
  <div class="profile-header">
    <v-avatar size="60px" color="surface-variant"></v-avatar>
    <div class="profile-info">
      <span>Тестовый тест тестович</span>
      <span>Мужчина. Рост: 165 см. Вес: 70 кг. Группа крови: B</span>
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
