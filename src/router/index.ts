import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomeView from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
//   {
//     path: '/blog',
//     name: 'blog',
//     // Esta sintaxis de importación dinámica es para "Lazy Loading".
//     // El código de BlogView.vue solo se cargará cuando el usuario visite /blog.
//     component: () => import('../views/BlogView.vue'),
//   },
//   {
//     path: '/recursos',
//     name: 'recursos',
//     component: () => import('../views/ResourcesView.vue'),
//   },
//   // Ruta dinámica para mostrar un post específico del blog
//   {
//     path: '/blog/:slug', // El ':slug' es un parámetro dinámico
//     name: 'postDetail',
//     component: () => import('../views/PostDetailView.vue'),
//   },
];

// 4. Crea la instancia del router.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;