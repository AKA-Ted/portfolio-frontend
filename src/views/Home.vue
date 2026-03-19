<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCvStore } from '../store/experienceStore';
import { storeToRefs } from 'pinia';
import { useI18n } from '../composables/useI18n';
import { useDateFormatter } from '../composables/useDateFormatter';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
import ErrorMessage from '../components/common/ErrorMessage.vue';
import { getPosts } from '../services/postService';
import type { Post } from '../interfaces/Post';

const store = useCvStore();
const { profile, experience, loading, error } = storeToRefs(store);
const { t } = useI18n();

// Latest experience entry (first in array = most recent)
const latestJob = computed(() => experience.value[0] ?? null);

// Blog: fetch last published post
const posts = ref<Post[]>([]);
const postsLoading = ref(true);

const { formatDate } = useDateFormatter();

onMounted(async () => {
  try {
    const all = await getPosts();
    posts.value = all.filter(p => p.published).slice(0, 1);
  } finally {
    postsLoading.value = false;
  }
});

const retryFetch = () => store.fetchData();
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-10 py-14 space-y-16">

    <!-- ─── LOADING / ERROR ────────────────────────────────── -->
    <LoadingSpinner v-if="loading" />

    <ErrorMessage 
      v-else-if="error" 
      :status="error.status" 
      :message="error.message" 
      @retry="retryFetch" 
    />

    <template v-else>

      <!-- ─── ABOUT / BIO ────────────────────────────────────── -->
      <section v-if="profile">
        <p class="text-gray-200 text-lg leading-relaxed">
          {{ profile.about }}
        </p>
      </section>

      <!-- ─── CURRENTLY WORKING AT ──────────────────────────── -->
      <section v-if="latestJob">
        <h2 class="section-label">Currently working at</h2>

        <div class="mt-4 p-5 rounded-xl border border-[#2e2e30] bg-[#232325]/40 hover:bg-[#232325]/70 transition-all duration-300 group">
          <div class="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <h3 class="text-gray-200 font-semibold group-hover:text-blue-400 transition-colors duration-200">
              {{ latestJob.role }}
            </h3>
            <span class="text-xs text-gray-500">{{ latestJob.period }}</span>
          </div>
          <p class="text-sm text-gray-400 mb-3">{{ latestJob.company }}</p>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ latestJob.description }}</p>
          <!-- Tech tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in latestJob.technologies"
              :key="tech"
              class="text-xs px-2.5 py-1 rounded-full bg-[#131314] border border-[#2e2e30] text-gray-400"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </section>

      <!-- ─── BLOG PREVIEW ───────────────────────────────────── -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="section-label">Blog</h2>
          <RouterLink to="/blog" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Ver todos →
          </RouterLink>
        </div>

        <div v-if="postsLoading" class="text-gray-500 text-sm text-center py-6">
          {{ t.common.loading }}
        </div>

        <div v-else-if="posts.length === 0" class="text-gray-600 text-sm italic">
          {{ t.sections.blog.noPosts }}
        </div>

        <ul v-else class="space-y-3">
          <li v-for="post in posts" :key="post.id">
            <RouterLink
              :to="{ name: 'postDetail', params: { url: post.url } }"
              class="flex items-baseline justify-between gap-4 py-3 px-4 rounded-lg border border-transparent
                     hover:border-[#2e2e30] hover:bg-[#232325]/50 transition-all duration-200 group"
            >
              <span class="text-gray-300 text-sm group-hover:text-blue-400 transition-colors leading-snug">
                {{ post.title }}
              </span>
              <span class="text-xs text-gray-600 whitespace-nowrap shrink-0">
                {{ formatDate(post.createdAt) }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </section>

    </template>
  </div>
</template>

<style scoped>
.section-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #6b7280; /* gray-500 */
}
</style>
