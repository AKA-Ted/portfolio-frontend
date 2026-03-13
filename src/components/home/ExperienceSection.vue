<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCvStore } from '../../store/experienceStore';
import { useI18n } from '../../composables/useI18n';

const cvStore = useCvStore();
const { experience, loading, error } = storeToRefs(cvStore);
const { t } = useI18n();
</script>

<template>
  <section class="experience-section py-8">
    <h2 class="text-3xl font-bold text-center mb-8 text-white">{{ t.sections.experience }}</h2>
    <div v-if="loading" class="text-center text-white">{{ t.common.loading }}</div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ t.common.error }}:</p>
      <pre>{{ error.message }}</pre>
    </div>
    <div v-else-if="experience.length > 0" class="max-w-4xl mx-auto">
      <div v-for="exp in experience" :key="exp.id" class="mb-6 p-4 border-l-4 border-gray-300 transition-all duration-300 hover:border-sky-400 hover:bg-gray-800">
        <h3 class="text-xl font-semibold text-sky-400">{{ exp.role }} - <span class="font-normal text-gray-300">{{ exp.company }}</span></h3>
        <p class="text-sm text-gray-500">{{ exp.period }}</p>
        <p class="mt-2 text-gray-400">{{ exp.description }}</p>
        <ul class="list-disc list-inside mt-2 text-gray-400">
          <li v-for="(achievement, index) in exp.achievements" :key="index">
            {{ achievement }}
          </li>
        </ul>
        <div class="mt-4">
            <span v-for="tech in exp.technologies" :key="tech" class="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
