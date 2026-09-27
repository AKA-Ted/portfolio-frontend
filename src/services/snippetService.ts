import apiClient from './apiClient';
import type { Snippet } from '../interfaces/Snippet';
import type { ApiResponse, Page } from '../interfaces/Api';

export const getSnippets = async (page = 0, size = 10): Promise<Snippet[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Page<Snippet>>>(`/api/snippet?page=${page}&size=${size}`);
    const resData = response.data;

    if (!resData) {
      throw { status: 500, message: 'SERVER ERROR (UNDEFINED).' };
    }

    if (resData.status !== 200) {
      throw { 
        status: resData.status, 
        message: resData.message || 'LOGIC ERROR (BACKEND).' 
      };
    }

    // Parse translation and io json strings
    return resData.data.content.map((snippet: any) => ({
      ...snippet,
      translation: typeof snippet.translation === 'string' ? JSON.parse(snippet.translation) : snippet.translation,
      io: typeof snippet.io === 'string' ? JSON.parse(snippet.io) : snippet.io
    }));
  } catch (error: any) {
    if (error.status) throw error;
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'NETWORK ERROR.';
    throw { status, message }; 
  }
};
