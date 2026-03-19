<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCvStore } from '../../store/experienceStore';
import { storeToRefs } from 'pinia';
import { useI18n } from '../../composables/useI18n';

const cvStore = useCvStore();
const { profile } = storeToRefs(cvStore);
const { t, currentLang, toggleLanguage: toggleLang } = useI18n();

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => { isMobileMenuOpen.value = !isMobileMenuOpen.value; };
const closeMenu = () => { isMobileMenuOpen.value = false; };
const toggleLanguage = () => { toggleLang(); closeMenu(); };

const navLinks = [
  { to: '/',         labelKey: 'home'     },
  { to: '/about',    labelKey: 'about' },
  { to: '/blog',     labelKey: 'docs'     },
  { to: '/snippets', labelKey: 'snippets' },
];
</script>

<template>
  <!-- ============================================================
       DESKTOP SIDEBAR
  ============================================================ -->
  <aside class="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 min-h-screen sticky top-0 h-screen border-r border-[#232325] px-8 py-10 overflow-y-auto">

    <!-- Header: Name & Language Toggle -->
    <div class="flex items-center justify-between mb-8 gap-4">
      <!-- Name / Logo -->
      <RouterLink to="/" class="group">
        <span class="text-2xl font-black uppercase tracking-tight name-gradient leading-none">
          {{ profile?.name ?? 'Sandy MC' }}
        </span>
        <span class="text-blue-400 text-xl font-black">.</span>
      </RouterLink>

      <!-- Language Toggle -->
      <button @click="toggleLanguage" class="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-[#232325] text-gray-200 rounded-lg hover:text-white hover:border-blue-400/50 transition-all border border-[#2e2e30]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {{ currentLang }}
      </button>
    </div>

    <!-- Typewriter bio -->
    <div class="mb-8">
      <div class="typing-container">
        <p class="text-blue-400 font-medium typing-effect text-sm">
          {{ profile?.title ?? 'Software Developer' }}
        </p>
      </div>
      <p class="text-gray-500 text-sm leading-relaxed mt-4">
        Desarrollador de software apasionado por construir herramientas útiles y experiencias digitales con cuidado al detalle.
      </p>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col gap-1 flex-1">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="nav-link"
        :class="{ 'nav-link--active': $route.path === link.to || ($route.path.startsWith(link.to) && link.to !== '/') }"
        @click="closeMenu"
      >
        {{ t.navbar[link.labelKey as keyof typeof t.navbar] }}
      </RouterLink>
    </nav>

    <!-- Bottom: footer -->
    <div class="mt-auto pt-8 border-t border-[#232325]">
      <p class="text-gray-600 text-xs mb-1">
        {{ t.common.footer }}
      </p>
      <p class="text-gray-600 text-xs">
        &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </aside>

  <!-- ============================================================
       MOBILE TOP BAR
  ============================================================ -->
  <header class="lg:hidden bg-[#131314]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-[#232325]">
    <div class="flex items-center justify-between px-4 h-14">
      <RouterLink to="/" class="text-white text-lg font-black uppercase tracking-tight" @click="closeMenu">
        Sandy MC<span class="text-blue-400">.</span>
      </RouterLink>

      <div class="flex items-center gap-3">
        <!-- Language -->
        <button @click="toggleLanguage" class="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-[#232325] text-gray-200 rounded-lg hover:text-white transition-all border border-[#2e2e30]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          {{ currentLang }}
        </button>
        <!-- Hamburger -->
        <button @click="toggleMobileMenu" class="text-gray-400 hover:text-white transition-colors p-1">
          <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMobileMenuOpen" class="border-t border-[#232325] px-4 py-4 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="mobile-nav-link"
          @click="closeMenu"
        >
          {{ t.navbar[link.labelKey as keyof typeof t.navbar] }}
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* === Name gradient === */
.name-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #94c8fb 50%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === Nav links === */
.nav-link {
  display: block;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
  transition: color 0.2s, background-color 0.2s;
}
.nav-link:hover {
  color: #e8eaed;
  background-color: #232325;
}
.nav-link--active {
  color: #60a5fa;
  font-weight: 600;
}

/* === Mobile nav links === */
.mobile-nav-link {
  display: block;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #9ca3af;
  transition: color 0.2s, background-color 0.2s;
}
.mobile-nav-link:hover {
  color: #e8eaed;
  background-color: #232325;
}

/* === Typewriter === */
.typing-container {
  display: inline-block;
  vertical-align: top;
}

.typing-effect {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: .12em solid #60a5fa;
  width: 0;
  animation:
    typing 3s steps(30, end) forwards,
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to   { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50%      { border-color: #60a5fa; }
}
</style>
