import {createWebHistory, createRouter} from 'vue-router';

import Homepage from '../components/Homepage.vue';
import ContactPage from '../components/ContactPage.vue';
import ExplorePage from '@/components/ExplorePage.vue';
import MessagePage from '@/components/MessagePage.vue';
import TaskPage from '@/components/TaskPage.vue';
import OfferPage from '@/components/OfferPage.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;