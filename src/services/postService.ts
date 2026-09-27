import apiClient from './apiClient';
import { type Post } from '../interfaces/Post'; 
import type { ApiResponse, Page } from '../interfaces/Api';

export const getPosts = async (page = 0, size = 10): Promise<Post[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Page<Post>>>(`/api/blog?page=${page}&size=${size}`);
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

    // El objeto real está en data.content
    return resData.data.content.map((post: any) => ({
      ...post,
      translation: typeof post.translation === 'string' ? JSON.parse(post.translation) : post.translation
    }));
  } catch (error: any) {
    if (error.status) throw error;
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'NETWORK ERROR.';
    throw { status, message }; 
  }
};

export const getPostByUrl = async (url: string): Promise<Post> => {
  try {
    const response = await apiClient.get<ApiResponse<Post>>(`/api/blog/${url}`);
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

    const post = resData.data;
    if (typeof post.translation === 'string') {
      post.translation = JSON.parse(post.translation);
    }
    return post;
  } catch (error: any) {
    if (error.status) throw error;
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'NETWORK ERROR.';
    throw { status, message };
  }
};