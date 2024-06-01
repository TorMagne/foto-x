import { createRouter, createWebHistory } from 'vue-router';
import { account } from '@/lib/appwrite.js';
const HomeView = () => import('../views/HomeView.vue');
const LoginView = () => import('../views/LoginView.vue');
const AdminPanelView = () => import('../views/AdminPanelView.vue');
const EditImagesview = () => import('../views/EditImagesview.vue');

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
    {
      path: '/editimages/:id/:collectionId',
      name: 'editimages',
      component: EditImagesview,
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
