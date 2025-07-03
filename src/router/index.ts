import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',

      component: AboutView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView,
    },
  ],
})

export default router
