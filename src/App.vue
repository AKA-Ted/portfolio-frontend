<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useCvStore } from './store/experienceStore';

import Sidebar from './components/layout/Sidebar.vue';

const cvStore = useCvStore();

onMounted(() => {
  cvStore.fetchData();
});
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen bg-[#131314]">

    <!-- Sidebar (desktop: left column | mobile: sticky top bar) -->
    <Sidebar />

    <!-- Main content -->
    <main class="flex-1 min-w-0">
      <RouterView />
    </main>

  </div>
</template>
