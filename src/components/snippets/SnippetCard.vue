<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Snippet } from '../../interfaces/Snippet';
import DynamicVisualizer from './DynamicVisualizer.vue';
import { useLanguageStore } from '../../store/languageStore';

const props = defineProps<{
  snippet: Snippet;
}>();

const languageStore = useLanguageStore();

const translation = computed(() => {
  const lang = languageStore.currentLang.toLowerCase() as 'es' | 'en';
  const transObj = props.snippet.translation as any;
  return transObj[lang] || transObj['es'];
});

const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(translation.value.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

const getCategoryColor = (category: string) => {
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('git')) return 'text-red-400 bg-red-500/10 border-red-500/20';
  if (lowerCat.includes('spark')) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
  if (lowerCat.includes('docker')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
  return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
};
</script>

<template>
  <div class="group bg-[#1a1a21] border border-[#2e2e30] hover:border-purple-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
    <div>
      <div class="flex items-start justify-between gap-3 mb-3">
        <div class="flex items-center gap-2">
          <span :class="['px-2.5 py-1 text-[11px] font-semibold rounded-md border flex items-center gap-1.5', getCategoryColor(snippet.category)]">
            {{ snippet.category }}
          </span>
        </div>
        
        <div class="flex items-center gap-1">
          <div class="relative flex items-center">
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-100 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
              <div v-if="copied" class="absolute right-full mr-2 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-medium rounded whitespace-nowrap border border-emerald-500/20">
                ¡Copiado!
              </div>
            </transition>
            <button @click="copyToClipboard" title="Copiar código" class="p-1.5 text-gray-500 hover:text-white rounded-lg transition-colors relative">
              <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <svg v-else class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      <h3 class="text-base font-bold text-white mb-1.5 font-mono bg-[#0a0a0e] border border-[#2e2e30] px-2 py-1 rounded w-fit inline-block">
        {{ snippet.command }}
      </h3>
      <p class="text-xs text-gray-400 mb-3.5 leading-relaxed">
        {{ translation.description }}
      </p>

      <!-- Code box -->
      <div class="relative rounded-xl overflow-hidden bg-[#0a0a0e] border border-[#2e2e30] font-mono text-[13px] leading-relaxed">
        <div class="flex items-center justify-between px-3.5 py-1.5 bg-[#13131a] border-b border-[#2e2e30] text-[11px] text-gray-400">
          <span>terminal / bash</span>
          <span class="text-purple-400">CLI</span>
        </div>
        <pre class="p-3.5 overflow-x-auto text-gray-200 whitespace-pre-wrap break-words"><code>{{ translation.code }}</code></pre>
      </div>

      <DynamicVisualizer 
        v-if="snippet.visualizer !== 'NONE'" 
        :type="snippet.visualizer" 
        :ioData="snippet.io" 
      />
    </div>
  </div>
</template>
