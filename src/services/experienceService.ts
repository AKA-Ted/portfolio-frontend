import apiClient from './apiClient';
import type { CvData } from '../interfaces/Experience';
import type { ApiResponse } from '../interfaces/Api';

export const getExperience = async (): Promise<CvData[]> => {
  try {
    const response = await apiClient.get<ApiResponse<CvData[]>>('/api/experience');
    
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

    return resData.data;
  } catch (error: any) {
    if (error.status) throw error;

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'NETWORK ERROR.' ;
    
    throw { status, message };
  }
};
