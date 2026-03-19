<script setup lang="ts">
import { useI18n } from '../../composables/useI18n';

interface Props {
  status?: number;
  message?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'retry'): void }>();

const { t, getStatusMessage } = useI18n();
</script>

<template>
  <div class="text-center py-20 w-full">
    <div class="bg-red-900/20 p-6 rounded-lg max-w-md mx-auto border border-red-500/30">
      <p class="text-red-500 font-semibold mb-4">
        {{ t.common.error }}: {{ props.message || (props.status ? getStatusMessage(props.status) : 'Unknown Error') }}
      </p>
      <button @click="emit('retry')" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors">
        {{ t.common.retry }}
      </button>
    </div>
  </div>
</template>
