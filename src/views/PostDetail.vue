<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostByUrl } from '../services/postService';
import type { Post } from '../interfaces/Post';
import { useI18n } from '../composables/useI18n';

const route = useRoute();
const router = useRouter();
const { t, getStatusMessage } = useI18n();

const post = ref<Post | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const locale = t.value.navbar.language === 'English' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const fetchPost = async () => {
  const url = route.params.url as string;
  try {
    isLoading.value = true;
    error.value = null;
    const response = await getPostByUrl(url);
    post.value = response;
  } catch (err: any) {
    error.value = getStatusMessage(err.status);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchPost();
});
</script>

<template>
  <main class="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
    <!-- Back Link -->
    <button 
      @click="router.back()" 
      class="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ t.sections.blog.back }}
    </button>

    <div v-if="isLoading" class="text-center text-gray-400 mt-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mb-4"></div>
      <p>{{ t.common.loading }}</p>
    </div>

    <div v-else-if="error" class="text-center p-8 mt-20">
      <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto border border-red-500/30">
        <p class="text-lg text-red-500 font-semibold mb-4">
          {{ t.common.error }}: {{ error }}
        </p>
        <button 
          @click="fetchPost"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          {{ t.common.retry }}
        </button>
      </div>
    </div>

    <article v-else-if="post" class="bg-[#232325] p-8 rounded-xl shadow-2xl border border-[#2e2e30]">
      <header class="mb-8 pb-8 border-b border-[#2e2e30]">
        <h1 class="text-4xl font-bold text-white mb-4">
          {{ post.title }}
        </h1>
        <p class="text-gray-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ t.sections.blog.publishedAt }} {{ formatDate(post.createdAt) }}
        </p>
      </header>

      <!-- Aquí iría el contenido del post. Como por ahora parece que no tiene 'content' en la interfaz Post, 
           asumo que se mostrará más info en el futuro o se usará markdown. -->
      <div class="prose prose-invert max-w-none">
        <p class="text-gray-300 text-lg leading-relaxed">
          {{ post.title }} - Contenido pendiente de implementar.
        </p>
      </div>
    </article>
  </main>
</template>
