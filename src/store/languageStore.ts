import { defineStore } from 'pinia';
import { labels, type Language } from '../i18n/labels';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLang: 'ES' as Language,
  }),
  getters: {
    t: (state) => labels[state.currentLang],
    getStatusMessage: (state) => (statusCode: number | string) => {
      const messages = labels[state.currentLang].statusMessages;
      return (messages as any)[statusCode] || messages.default;
    },
  },
  actions: {
    toggleLanguage() {
      this.currentLang = this.currentLang === 'ES' ? 'EN' : 'ES';
    },
    setLanguage(lang: Language) {
      this.currentLang = lang;
    },
  },
});
