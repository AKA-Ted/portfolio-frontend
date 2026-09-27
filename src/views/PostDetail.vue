<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { getPostByUrl } from '../services/postService';
import type { Post } from '../interfaces/Post';
import { useI18n } from '../composables/useI18n';
import { usePostTranslation } from '../composables/usePostTranslation';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { translate } = usePostTranslation();

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

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

const translated = computed(() => {
  if (!post.value) return null;
  return translate(post.value);
});

const renderedContent = computed(() => {
  if (!translated.value) return '';
  return md.render(translated.value.content);
});

const fetchPost = async () => {
  const url = route.params.url as string;
  try {
    isLoading.value = true;
    error.value = null;
    const response = await getPostByUrl(url);
    post.value = response;
  } catch (err: any) {
    error.value = err.message || 'Error loading post';
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
      class="flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {{ t.sections.blog.back }}
    </button>

    <div v-if="isLoading" class="text-center text-gray-400 mt-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-400 mb-4"></div>
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

    <article v-else-if="post && translated" class="bg-[#232325] p-8 rounded-xl shadow-2xl border border-[#2e2e30]">
      <header class="mb-8 pb-8 border-b border-[#2e2e30]">
        <h1 class="text-4xl font-bold text-white mb-4">
          {{ translated.title }}
        </h1>
        <p class="text-gray-400 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ t.sections.blog.publishedAt }} {{ formatDate(post.createdAt) }}
        </p>
      </header>

      <!-- Rendered Markdown Content -->
      <div class="prose-content" v-html="renderedContent"></div>
    </article>
  </main>
</template>

<style scoped>
/* Markdown content styling for dark theme */
.prose-content {
  color: #d1d5db; /* gray-300 */
  font-size: 1.125rem;
  line-height: 1.8;
}

.prose-content :deep(h1) {
  color: #f3f4f6;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #2e2e30;
}

.prose-content :deep(h2) {
  color: #f3f4f6;
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-content :deep(h3) {
  color: #e5e7eb;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
}

.prose-content :deep(h4) {
  color: #e5e7eb;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose-content :deep(p) {
  margin-bottom: 1.25rem;
}

.prose-content :deep(a) {
  color: #a78bfa; /* purple-400 */
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}

.prose-content :deep(a:hover) {
  color: #c4b5fd; /* purple-300 */
}

.prose-content :deep(strong) {
  color: #f3f4f6;
  font-weight: 600;
}

.prose-content :deep(em) {
  font-style: italic;
  color: #d1d5db;
}

.prose-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose-content :deep(li) {
  margin-bottom: 0.5rem;
}

.prose-content :deep(li strong) {
  color: #e5e7eb;
}

.prose-content :deep(blockquote) {
  border-left: 3px solid #a78bfa;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #9ca3af;
  font-style: italic;
}

.prose-content :deep(code) {
  background: #131314;
  color: #c4b5fd;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.prose-content :deep(pre) {
  background: #131314;
  border: 1px solid #2e2e30;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #d1d5db;
  font-size: 0.875rem;
}

.prose-content :deep(hr) {
  border: none;
  border-top: 1px solid #2e2e30;
  margin: 2rem 0;
}

.prose-content :deep(img) {
  border-radius: 0.5rem;
  max-width: 100%;
  margin: 1.5rem 0;
}

.prose-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose-content :deep(th) {
  background: #131314;
  color: #e5e7eb;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid #2e2e30;
}

.prose-content :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid #2e2e30;
}
</style>
