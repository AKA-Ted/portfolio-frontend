<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="text-center py-8 mt-16 border-t border-gray-800">
    <p class="text-gray-500">
        &copy; {{ currentYear }} Sandy MC. Diseñado y construido por mí.
    </p>
  </footer>
</template>
