<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type: string;
  ioData: any;
}>();

const isList = computed(() => props.type === 'LIST');
const isTable = computed(() => props.type === 'TABLE');
</script>

<template>
  <div v-if="ioData && (isList || isTable)" class="mt-4 p-4 bg-[#0a0a0e] border border-dashed border-[#23232f] rounded-lg">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
      
      <!-- Input Data -->
      <div class="overflow-x-auto">
        <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> 
          Input Data
        </div>
        
        <ul v-if="isList" class="list-none space-y-1.5 border-l border-[#2e2e30] pl-3 text-xs text-gray-400 font-mono">
          <li v-for="(item, index) in ioData.input_data" :key="index">
            <span class="text-amber-500 mr-2">{{ item.split(' ')[0] }}</span><span>{{ item.substring(item.indexOf(' ') + 1) }}</span>
          </li>
        </ul>
        
        <table v-else-if="isTable" class="w-full text-xs text-gray-400 font-mono text-left border-collapse">
          <thead>
            <tr>
              <th v-for="(header, index) in ioData.input_data?.headers" :key="index" class="border border-white/5 p-1.5 bg-white/5 font-semibold text-gray-300">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rIndex) in ioData.input_data?.rows" :key="rIndex">
              <td v-for="(cell, cIndex) in row" :key="cIndex" class="border border-white/5 p-1.5">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Arrow Indicator -->
      <div class="flex justify-center my-2 md:my-0">
        <div class="flex items-center justify-center bg-purple-500/10 text-purple-400 w-7 h-7 rounded-full">
          <svg class="w-4 h-4 md:rotate-0 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </div>
      </div>

      <!-- Output Data -->
      <div class="overflow-x-auto">
        <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <svg class="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> 
          Output
        </div>
        
        <ul v-if="isList" class="list-none space-y-1.5 border-l border-purple-500/50 pl-3 text-xs text-gray-200 font-mono">
          <li v-for="(item, index) in ioData.output_data" :key="index">
            <span class="text-emerald-400 mr-2">{{ item.split(' ')[0] }}</span><span>{{ item.substring(item.indexOf(' ') + 1) }}</span>
          </li>
        </ul>

        <table v-else-if="isTable" class="w-full text-xs text-gray-400 font-mono text-left border-collapse">
          <thead>
            <tr>
              <th v-for="(header, index) in ioData.output_data?.headers" :key="index" class="border border-white/5 p-1.5 bg-white/5 font-semibold text-gray-300">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rIndex) in ioData.output_data?.rows" :key="rIndex">
              <td v-for="(cell, cIndex) in row" :key="cIndex" class="border border-white/5 p-1.5">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  </div>
</template>
