import { createRouter, createWebHistory } from 'vue-router';
import { account } from '@/lib/appwrite.js';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminPanelView from '../views/AdminPanelView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/adminlogin',
      name: 'admin',
      component: LoginView,
    },
    {
      path: '/adminpanel',
      name: 'adminpanel',
      component: AdminPanelView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'adminpanel') {
    account
      .get()
      .then(() => {
        next();
      })
      .catch(() => {
        next({ name: 'admin' });
      });
  } else {
    next();
  }
});

export default router;
