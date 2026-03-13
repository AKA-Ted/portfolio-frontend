<script setup lang="ts">
import { useCvStore } from '../../store/experienceStore';
import { useI18n } from '../../composables/useI18n';
import { storeToRefs } from 'pinia';

const cvStore = useCvStore();
const { education, loading, error } = storeToRefs(cvStore);
const { t } = useI18n();
</script>

<template>
  <section class="education-section py-8 bg-gray-800">
    <h2 class="text-3xl font-bold text-center mb-8 text-white">{{ t.sections.education }}</h2>
    <div v-if="loading" class="text-center text-white">{{ t.common.loading }}</div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ t.common.error }}:</p>
      <pre>{{ error.message }}</pre>
    </div>
    <div v-else-if="education.length > 0" class="max-w-4xl mx-auto">
      <div v-for="(edu, index) in education" :key="index" class="mb-6 p-4 border-l-4 border-gray-600 transition-all duration-300 hover:border-sky-400 hover:bg-gray-700">
        <h3 class="text-xl font-semibold text-sky-400">{{ edu.degree }}</h3>
        <p class="font-normal text-gray-300">{{ edu.institution }}</p>
        <p class="text-sm text-gray-500">{{ edu.year }}</p>
      </div>
    </div>
  </section>
</template>
