import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue'; 
import RegisterView from '@/views/RegisterView.vue'
import CreateTeam from '@/views/CreateTeam.vue'

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
      path: '/login', // 🆕 nova ruta
      name: 'login',
      component: LoginView,
    },
{
  path: '/teams/create',
  name: 'CreateTeam',
  component: () => import('@/views/CreateTeam.vue')
},

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
  path: '/profile',
  name: 'Profile',
  component: () => import('@/views/ProfileView.vue')
    },
    {
  path: '/tournaments/:id',
  name: 'TournamentDetails',
  component: () => import('@/views/TournamentDetailsView.vue'),
    },
    
    {
  path: '/tournaments',
  name: 'tournaments',
  component: () => import('@/views/TournamentsView.vue')
    },
  ],
});

export default router;
