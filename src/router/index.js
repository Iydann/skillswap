import {createWebHistory, createRouter} from 'vue-router';

import Homepage from '../components/Homepage.vue';
import ContactPage from '../components/ContactPage.vue';

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
  },
  {
    path: '/contact',
    name: 'Contactpage',
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;