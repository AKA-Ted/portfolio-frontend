import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomeView from '../views/Home.vue';
import PostView from '../views/Post.vue';
import PostDetailView from '../views/PostDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => PostView, 
  },
  {
    path: '/blog/:url',
    name: 'postDetail',
    component: () => PostDetailView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;