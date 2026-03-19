<script setup lang="ts">
import { useI18n } from '../../composables/useI18n';
const { t } = useI18n();
</script>

<template>
  <div class="text-center py-20 w-full">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mb-4"></div>
    <p class="text-gray-500">{{ t.common.loading }}</p>
  </div>
</template>
