import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TestPage from '@/views/TestPage.vue';
import LoginView from '@/views/LoginView.vue'; 
import RegisterView from '@/views/RegisterView.vue'

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
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
  path: '/tournaments',
  name: 'tournaments',
  component: () => import('@/views/TournamentsView.vue')
},
  ],
});

export default router;
