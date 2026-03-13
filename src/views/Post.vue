<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

import { getPosts } from '../services/postService';
import type { Post } from '../interfaces/Post'; 
import { useI18n } from '../composables/useI18n';

const { t, getStatusMessage } = useI18n();
const posts = ref<Post[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const currentPage = ref(1);
const itemsPerPage = 5;

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

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    error.value = null; 
    
    const response = await getPosts();
    posts.value = response.filter(post => post.published);
  } catch (err: any) {
    error.value = getStatusMessage(err.status);
  } finally {
    isLoading.value = false;
  }
};

const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return posts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <main class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    
    <h1 class="text-4xl font-bold text-white mb-12">
      {{ t.sections.blog.title }}
    </h1>

    <div v-if="isLoading" class="text-center text-gray-400 mt-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500 mb-4"></div>
      <p>{{ t.common.loading }}</p>
    </div>

    <div v-else-if="error" class="text-center p-8 mt-20">
      <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto border border-red-500/30">
        <p class="text-lg text-red-500 font-semibold mb-4">
          {{ t.common.error }}: {{ error }}
        </p>
        <button 
          @click="fetchPosts"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          {{ t.common.retry }}
        </button>
      </div>
    </div>

    <div v-else-if="paginatedPosts.length > 0">
      <div class="space-y-8">
        <article 
          v-for="post in paginatedPosts" 
          :key="post.id"
          class="bg-gray-800/50 p-6 rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300 border border-gray-700 hover:border-sky-500/50"
        >
          <RouterLink 
            :to="{ name: 'postDetail', params: { url: post.url } }"
            class="block group"
          >
            <h2 class="text-2xl font-semibold text-white group-hover:text-sky-400 transition-colors">
              {{ post.title }}
            </h2>
            
            <p class="text-sm text-gray-500 mt-2">
              {{ t.sections.blog.publishedAt }} {{ formatDate(post.createdAt) }}
            </p>

            </RouterLink>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center space-x-4">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-700"
        >
          {{ t.sections.blog.previous }}
        </button>
        <span class="text-gray-400">
          {{ currentPage }} / {{ totalPages }}
        </span>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors border border-gray-700"
        >
          {{ t.sections.blog.next }}
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-400">
      <p>{{ t.sections.blog.noPosts }}</p>
    </div>

  </main>
</template>