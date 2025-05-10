import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TestPage from '@/views/TestPage.vue';
import LoginView from '@/views/LoginView.vue'; // 🆕 dodano

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },
    {
      path: '/login', // 🆕 nova ruta
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;
