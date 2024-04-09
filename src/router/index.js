import { createRouter, createWebHistory } from 'vue-router';
import GlobalView from '@/components/GlobalView.vue';
import UserManagement from '@/components/UserManagement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: GlobalView
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;