<script setup lang="ts">
import { useCvStore } from '../store/experienceStore';
import { storeToRefs } from 'pinia';
import { useI18n } from '../composables/useI18n';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
import ErrorMessage from '../components/common/ErrorMessage.vue';

const store = useCvStore();
const { profile, experience, education, loading, error } = storeToRefs(store);
const { t } = useI18n();

const retryFetch = () => store.fetchData();
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-10 py-14 space-y-16">

    <!-- LOADING -->
    <LoadingSpinner v-if="loading" />

    <!-- ERROR -->
    <ErrorMessage 
      v-else-if="error" 
      :status="error.status" 
      :message="error.message" 
      @retry="retryFetch" 
    />

    <template v-else>

      <!-- ─── BIO ──────────────────────────────────────────────── -->
      <section v-if="profile">
        <h1 class="section-label mb-4">{{ t.sections.about }}</h1>
        <p class="text-gray-300 text-base leading-relaxed">{{ profile.about }}</p>
      </section>

      <!-- ─── EXPERIENCE ───────────────────────────────────────── -->
      <section v-if="experience.length > 0">
        <h2 class="section-label mb-6">{{ t.sections.experience }}</h2>

        <div class="space-y-5">
          <div
            v-for="exp in experience"
            :key="exp.id"
            class="p-5 rounded-xl border border-[#2e2e30] bg-[#232325]/30 hover:bg-[#232325]/60 transition-all duration-300 group"
          >
            <div class="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h3 class="text-sm font-semibold text-gray-200 group-hover:text-blue-400 transition-colors">
                {{ exp.role }}
              </h3>
              <span class="text-xs text-gray-500 shrink-0">{{ exp.period }}</span>
            </div>
            <p class="text-sm text-gray-400 mb-2">{{ exp.company }}</p>
            <p class="text-sm text-gray-500 leading-relaxed mb-3">{{ exp.description }}</p>

            <ul class="space-y-1 mb-3">
              <li v-for="(a, i) in exp.achievements" :key="i" class="flex items-start gap-2 text-sm text-gray-500">
                <span class="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-blue-400/50"></span>
                {{ a }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in exp.technologies"
                :key="tech"
                class="text-xs px-2.5 py-1 rounded-full bg-[#131314] border border-[#2e2e30] text-gray-400"
              >{{ tech }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── EDUCATION ─────────────────────────────────────────── -->
      <section v-if="education.length > 0">
        <h2 class="section-label mb-6">{{ t.sections.education }}</h2>

        <div class="space-y-3">
          <div
            v-for="(edu, i) in education"
            :key="i"
            class="flex items-start gap-4 p-4 rounded-lg border border-transparent hover:border-[#2e2e30] hover:bg-[#232325]/40 transition-all duration-200 group"
          >
            <div class="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#2e2e30] group-hover:bg-blue-400 transition-colors"></div>
            <div>
              <h3 class="text-sm font-semibold text-gray-200">{{ edu.degree }}</h3>
              <p class="text-sm text-gray-400">{{ edu.institution }}</p>
              <p class="text-xs text-gray-600 mt-0.5">{{ edu.year }}</p>
            </div>
          </div>
        </div>
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
  color: #6b7280;
}
</style>
