<script setup>
import ProfileHeader from "@/components/Index/ProfileHeader.vue";
import { MENU } from "@/data/menu.js";
</script>

<template>
  <div class="profile">
    <ProfileHeader />
    <v-card elevation="4" rounded="lg">
      <v-card-text class="pa-2">
        <v-list-item v-for="(item, i) in MENU" :key="i" rounded="lg">
          <template #title>
            <a :href="item.link" class="font-weight-bold" style="color: #fff; width: 100%; display: block; font-size: 12px;">{{ item.title }}</a>
          </template>
        </v-list-item>
      </v-card-text>
    </v-card>
  </div>
</template>

<style>
.profile {
  display: grid;
  gap: 30px;
}
</style>
