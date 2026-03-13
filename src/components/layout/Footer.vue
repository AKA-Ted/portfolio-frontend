<script setup lang="ts">
import { useI18n } from '../../composables/useI18n';
const { t } = useI18n();
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="text-center py-8 mt-16 border-t border-gray-800">
    <p class="text-gray-500">
        &copy; {{ currentYear }} Sandy MC. {{ t.common.footer }}
    </p>
  </footer>
</template>
