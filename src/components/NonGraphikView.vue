<script setup>
const props = defineProps(['title', 'items']);
</script>

<template>
  <v-toolbar color="" elevation="1" height="84">
    <template #title>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
    </template>
  </v-toolbar>
  <v-card v-if="items" elevation="4" rounded="lg">
    <v-card-text class="pa-2">
      <v-list-item v-for="(item, i) in items" :key="i" rounded="lg">
        <template #title>
          <div class="text-body-2 font-weight-bold">{{ item.name }}</div>
        </template>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-toolbar {
  background-color: unset !important;
}
</style>
