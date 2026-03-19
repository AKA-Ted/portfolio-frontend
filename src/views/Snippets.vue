<script setup lang="ts">
import SnippetCard from '../components/snippets/SnippetCard.vue';
</script>

<template>
  <main class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-4xl font-extrabold text-gray-200 mb-3">Snippets</h1>

    <!-- Grid placeholder -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
      <SnippetCard />
    </div>
  </main>
</template>
