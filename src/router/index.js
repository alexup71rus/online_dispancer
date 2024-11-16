import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NonGraphikView from "@/components/NonGraphikView.vue";
import ScheduleOfVisits from "@/components/Index/ScheduleOfVisits.vue";
import ScheduleOfMedicine from "@/components/Index/ScheduleOfMedicine.vue";
import {ALLERGIES} from "@/data/allergies.js";
import {VACCINATIOONS} from "@/data/vaccinations.js";
import {DISEASES} from "@/data/diseases.js";
import ScheduleOfParams from "@/components/Index/ScheduleOfParams.vue";

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
      component: NonGraphikView,
      props: {title: 'Аллергии', items: ALLERGIES}
    },
    {
      path: '/vaccinations',
      name: 'vaccinations',
      component: NonGraphikView,
      props: {title: 'Прививки', items: VACCINATIOONS}
    },
    {
      path: '/diseases',
      name: 'diseases',
      component: NonGraphikView,
      props: {title: 'Хронические заболевания', items: DISEASES}
    },
    {
      path: '/schedule-of-visits',
      name: 'schedule-of-visits',
      component: ScheduleOfVisits,
      props: {title: 'Расписание приемов очно'}
    },
    {
      path: '/schedule-of-medicine',
      name: 'schedule-of-medicine',
      component: ScheduleOfMedicine,
      props: {title: 'Расписание приёма медикаментов'}
    },
    {
      path: '/schedule-of-params',
      name: 'schedule-of-params',
      component: ScheduleOfParams,
      props: {title: 'Расписание снятия показателей'}
    },
  ],
})

export default router
