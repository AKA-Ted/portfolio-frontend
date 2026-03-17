import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomeView from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Post.vue'),
  },
  {
    path: '/blog/:url',
    name: 'postDetail',
    component: () => import('../views/PostDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;