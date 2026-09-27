import { computed } from 'vue';
import { useLanguageStore } from '../store/languageStore';
import type { Post, PostTranslation, PostTranslations } from '../interfaces/Post';

/**
 * Returns the translated fields (title, content, summary) for a post
 * based on the current app language.
 */
export function getPostTranslation(post: Post, lang: string): PostTranslation {
  const key = lang.toLowerCase() as keyof PostTranslations;
  return post.translation[key] ?? post.translation.es;
}

/**
 * Composable that provides a reactive helper to get a post's
 * translated fields based on the current language.
 */
export function usePostTranslation() {
  const languageStore = useLanguageStore();
  const currentLang = computed(() => languageStore.currentLang);

  const translate = (post: Post): PostTranslation => {
    return getPostTranslation(post, currentLang.value);
  };

  return { translate, currentLang };
}
