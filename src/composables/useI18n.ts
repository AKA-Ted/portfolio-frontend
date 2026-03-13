import { computed } from 'vue';
import { useLanguageStore } from '../store/languageStore';

export function useI18n() {
  const languageStore = useLanguageStore();

  const t = computed(() => languageStore.t);
  const currentLang = computed(() => languageStore.currentLang);
  const getStatusMessage = (code: number | string) => languageStore.getStatusMessage(code);

  return {
    t,
    currentLang,
    getStatusMessage,
    toggleLanguage: languageStore.toggleLanguage,
    setLanguage: languageStore.setLanguage
  };
}
