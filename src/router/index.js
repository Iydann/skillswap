import {createWebHistory, createRouter} from 'vue-router';

import Homepage from '../pages/Homepage.vue';
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
  history: createWebHistory('/skillswap/'),
  routes
});

export default router;