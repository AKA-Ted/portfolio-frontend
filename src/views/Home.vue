<script setup lang="ts">
// Importa los componentes que formarán la página de inicio
import HeroSection from '../components/HeroSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
// Aquí también importarías tu proyecto de acortador de URL
// import UrlShortener from '@/components/UrlShortener.vue';
</script>

<template>
  <div>
    <!-- Cada componente se convierte en una sección de la página -->
    <HeroSection />
    
    <main class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SkillsSection />
      
      <!-- 
        Aquí iría la sección para tu proyecto interactivo, 
        como el acortador de URLs.
      -->
      <!-- <UrlShortener /> -->
    </main>
  </div>
</template>
