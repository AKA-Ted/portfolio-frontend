import { useI18n } from '../composables/useI18n';

export const useDateFormatter = () => {
  const { t } = useI18n();

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Si el texto del navbar dice 'English', asumimos que el idioma "opuesto" o actual dicta el local.
    // Lógica pre-existente conservada:
    const locale = t.value.navbar.language === 'English' ? 'es-ES' : 'en-US';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return { formatDate };
};
