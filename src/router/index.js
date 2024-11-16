import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NonListView from "@/views/NonGraphikView.vue";
import ScheduleOfVisits from "@/components/Index/ScheduleOfVisits.vue";
import {ALLERGIES} from "@/data/allergies.js";
import {VACCINATIOONS} from "@/data/vaccinations.js";
import {DISEASES} from "@/data/diseases.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/allergies',
      name: 'allergies',
      component: NonListView,
      props: {title: 'Аллергии', items: ALLERGIES}
    },
    {
      path: '/vaccinations',
      name: 'vaccinations',
      component: NonListView,
      props: {title: 'Прививки', items: VACCINATIOONS}
    },
    {
      path: '/diseases',
      name: 'diseases',
      component: NonListView,
      props: {title: 'Хронические заболевания', items: DISEASES}
    },
    {
      path: '/schedule-of-visits',
      name: 'schedule-of-visits',
      component: ScheduleOfVisits,
      props: {title: 'Расписание приемов очно'}
    },
  ],
})

export default router
