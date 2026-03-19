import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getExperience } from '../services/experienceService';
import { useLanguageStore } from './languageStore';
import type { CvData, Profile, Education, ExperienceItem, Language } from '../interfaces/Experience';

export const useCvStore = defineStore('cv', () => {
  // ─── STATE ───
  const allData = ref<CvData[]>([]);
  const loading = ref(false);
  const error = ref<{ status: number; message: string } | null>(null);

  // ─── GETTERS ───
  const languageStore = useLanguageStore();

  const data = computed(() => {
    if (allData.value.length === 0) return null;
    
    const filteredData = allData.value.find(item => 
      item.cvLang?.toUpperCase() === languageStore.currentLang.toUpperCase()
    );
    
    return filteredData || allData.value[0];
  });

  const profile = computed<Profile | undefined>(() => data.value?.cvInfo.profile);
  const education = computed<Education[]>(() => data.value?.cvInfo.education || []);
  const experience = computed<ExperienceItem[]>(() => data.value?.cvInfo.experience || []);
  const languages = computed<Language[]>(() => data.value?.cvInfo.languages || []);

  // ─── ACTIONS ───
  const fetchData = async () => {
    if (allData.value.length > 0) return;

    loading.value = true;
    error.value = null;
    try {
      allData.value = await getExperience();
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    // expose state
    allData, loading, error,
    // expose getters
    data, profile, education, experience, languages,
    // expose actions
    fetchData
  };
});
