<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getSnippets } from '../services/snippetService';
import type { Snippet } from '../interfaces/Snippet';
import SnippetCard from '../components/snippets/SnippetCard.vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const snippets = ref<Snippet[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const searchQuery = ref('');
const activeTech = ref('All');

const fetchSnippets = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await getSnippets(0, 100);
    // filter published if needed, or just show all for now
    snippets.value = response;
  } catch (err: any) {
    error.value = err.message || 'Error loading snippets';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSnippets();
});

const uniqueCategories = computed(() => {
  const categories = snippets.value.map(s => s.category);
  return ['All', ...new Set(categories)];
});

const filteredSnippets = computed(() => {
  let result = snippets.value;
  
  if (activeTech.value !== 'All') {
    result = result.filter(s => s.category === activeTech.value);
  }
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(s => {
      const trans: any = s.translation;
      const esDesc = trans?.es?.description?.toLowerCase() || '';
      const enDesc = trans?.en?.description?.toLowerCase() || '';
      return s.command.toLowerCase().includes(q) || 
             esDesc.includes(q) || 
             enDesc.includes(q) ||
             s.category.toLowerCase().includes(q);
    });
  }
  
  return result;
});

const printPage = () => {
  window.print();
};
</script>

<template>
  <main class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 print:py-4">
    <div class="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-4xl font-extrabold text-white mb-4 print:text-black">Snippets & Cheat Sheets</h1>
        <p class="text-gray-400 print:text-gray-600">Colección de comandos útiles, configuraciones y fragmentos de código.</p>
      </div>
      
      <!-- Print Button -->
      <button 
        @click="printPage" 
        class="print:hidden flex items-center gap-2 px-4 py-2 bg-[#1a1a21] text-gray-300 hover:text-white border border-[#2e2e30] hover:border-purple-500 rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        <span>Imprimir PDF</span>
      </button>
    </div>

    <!-- Toolbar: Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 print:hidden">
      
      <!-- Tech Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          v-for="cat in uniqueCategories" 
          :key="cat"
          @click="activeTech = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-medium transition-colors border',
            activeTech === cat 
              ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
              : 'bg-[#1a1a21] text-gray-400 border-[#2e2e30] hover:border-gray-500'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full md:w-64">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar comandos..." 
          class="block w-full pl-10 pr-3 py-2 border border-[#2e2e30] rounded-lg leading-5 bg-[#1a1a21] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
        >
      </div>
      
    </div>

    <div v-if="isLoading" class="text-center text-gray-400 mt-20">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-400 mb-4"></div>
      <p>{{ t.common.loading }}</p>
    </div>

    <div v-else-if="error" class="text-center p-8 mt-20">
      <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto border border-red-500/30">
        <p class="text-lg text-red-500 font-semibold mb-4">
          {{ t.common.error }}: {{ error }}
        </p>
        <button 
          @click="fetchSnippets"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
        >
          {{ t.common.retry }}
        </button>
      </div>
    </div>

    <div v-else-if="filteredSnippets.length === 0" class="text-center py-16 border border-dashed border-[#2e2e30] rounded-xl mt-4">
      <p class="text-gray-400">No se encontraron snippets que coincidan con la búsqueda.</p>
    </div>

    <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <SnippetCard 
        v-for="snippet in filteredSnippets" 
        :key="snippet.url"
        :snippet="snippet"
      />
    </div>
  </main>
</template>
