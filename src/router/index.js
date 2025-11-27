import {createWebHistory, createRouter} from 'vue-router';

import Homepage from '../components/Homepage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import ExplorePage from '@/pages/ExplorePage.vue';
import MessagePage from '@/pages/MessagePage.vue';
import TaskPage from '@/pages/TaskPage.vue';
import OfferPage from '@/pages/OfferPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';

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
  {
    path: '/explore',
    name: 'Explore',
    component: ExplorePage,
  },
  {
    path: '/message',
    name: 'Message',
    component: MessagePage,
  },
  {
    path: '/task',
    name: 'Task',
    component: TaskPage,
  },
  {
    path: '/create-offer',
    name: 'Offer',
    component: OfferPage,
  },
  {
    path: '/about',
    name: 'About',
    component: ContactPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;