import { defineStore } from 'pinia';
import { getExperience } from '../services/experienceService';
import { useLanguageStore } from './languageStore';
import type { CvData, Profile, Education, ExperienceItem, Language } from '../interfaces/Experience';

export const useCvStore = defineStore('cv', {
  state: () => ({
    allData: [] as CvData[],
    loading: false,
    error: null as { status: number; message: string } | null,
  }),
  getters: {
    data: (state) => {
      if (state.allData.length === 0) return null;
      
      const languageStore = useLanguageStore();
      
      // Buscamos el objeto que coincida con el idioma actual
      const filteredData = state.allData.find(item => 
        item.cvLang?.toUpperCase() === languageStore.currentLang.toUpperCase()
      );
      
      // Si no lo encuentra, intentamos con el primero disponible
      return filteredData || state.allData[0];
    },
    profile(): Profile | undefined { return this.data?.cvInfo.profile },
    education(): Education[] { return this.data?.cvInfo.education || [] },
    experience(): ExperienceItem[] { return this.data?.cvInfo.experience || [] },
    languages(): Language[] { return this.data?.cvInfo.languages || [] },
  },
  actions: {
    async fetchData() {
      if (this.allData.length > 0) return;

      this.loading = true;
      this.error = null;
      try {
        const cvDataArray = await getExperience();
        this.allData = cvDataArray;
      } catch (err: any) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
