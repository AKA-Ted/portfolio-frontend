<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useCvStore } from './store/experienceStore';

import Footer from './components/layout/Footer.vue';
import Navbar from './components/layout/Navbar.vue';

const cvStore = useCvStore();

onMounted(() => {
  cvStore.fetchData();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <Navbar />

    <main class="flex-grow">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

