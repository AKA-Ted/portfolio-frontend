<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ExperienceSection from '../components/home/ExperienceSection.vue';
import EducationSection from '../components/home/EducationSection.vue';
import HeroSection from '../components/home/HeroSection.vue';
import { useCvStore } from '../store/experienceStore';
import { useI18n } from '../composables/useI18n';

const store = useCvStore();
const { t, getStatusMessage } = useI18n();

const showScrollTop = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  store.fetchData();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const retryFetch = () => {
  store.fetchData();
};
</script>

<template>
  <div class="relative">
    <div v-if="store.loading" class="text-center p-8 mt-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500 mb-4"></div>
      <p class="text-lg text-gray-500">{{ t.common.loading }}</p>
    </div>
    
    <div v-else-if="store.error" class="text-center p-8 mt-20">
      <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto border border-red-500/30">
        <p class="text-lg text-red-500 font-semibold mb-2">
          {{ t.common.error }}: {{ getStatusMessage(store.error.status) }}
        </p>
        <p class="text-sm text-gray-400 mb-6">
          Log: {{ store.error.message }}
        </p>
        <button 
          @click="retryFetch"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          {{ t.common.retry }}
        </button>
      </div>
    </div>

    <div v-else>
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
    </div>

    <!-- Botón Volver Arriba -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-10"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-10"
    >
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
        :title="t.common.scrollTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>
