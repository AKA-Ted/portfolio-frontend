<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const isMobileMenuOpen = ref(false);

const currentLang = ref('ES');

const toggleMobileMenu = ():void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

const toggleLanguage = (): void => {
  currentLang.value = currentLang.value === 'ES' ? 'EN' : 'ES';

  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
}

const closeMenu = (): void => {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <nav class="bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <!-- Logo o Nombre del Sitio -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-white text-2xl font-bold tracking-wider">
            Sandy MC<span class="text-sky-400">.</span>
          </RouterLink>
        </div>

        <!-- Menú de Navegación para Escritorio -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-2">
            <RouterLink to="/" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Inicio</RouterLink>
            <RouterLink to="/blog" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Blog</RouterLink>
            <RouterLink to="/recursos" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Recursos</RouterLink>
          </div>
        </div>

        <!-- Botón de Idioma y Menú Hamburguesa -->
        <div class="flex items-center">
          <!-- Botón de Idioma -->
          <button @click="toggleLanguage" class="hidden md:block bg-slate-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4">
            <span class="px-2 text-sm font-semibold">{{ currentLang }}</span>
          </button>

          <!-- Botón de Hamburguesa (solo visible en móvil) -->
          <div class="-mr-2 flex md:hidden">
            <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center rounded-md bg-slate-800/80 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
              <span class="sr-only">Abrir menú principal</span>
              <!-- Icono de hamburguesa (tres líneas) -->
              <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <!-- Icono de 'X' para cerrar -->
              <svg v-else class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>

    <!-- Menú Desplegable para Móvil -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <RouterLink @click="closeMenu" to="/" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Inicio</RouterLink>
          <RouterLink @click="closeMenu" to="/blog" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Blog</RouterLink>
          <RouterLink @click="closeMenu" to="/recursos" class="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">Recursos</RouterLink>
        </div>
        <!-- Botón de idioma dentro del menú móvil -->
        <div class="border-t border-gray-700 px-2 pt-3 pb-3">
          <button @click="toggleLanguage" class="w-full text-left block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
            Cambiar a {{ currentLang === 'ES' ? 'EN' : 'ES' }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>