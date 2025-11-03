<script setup lang="ts">
import { RouterView } from 'vue-router';

import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <Navbar />

    <main class="flex-grow">
      <RouterView></RouterView>
      </main>

    <Footer></Footer>
  </div>
</template>

