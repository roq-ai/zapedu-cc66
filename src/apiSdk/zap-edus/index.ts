import axios from 'axios';
import queryString from 'query-string';
import { ZapEduInterface, ZapEduGetQueryInterface } from 'interfaces/zap-edu';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getZapEdus = async (query?: ZapEduGetQueryInterface): Promise<PaginatedInterface<ZapEduInterface>> => {
  const response = await axios.get('/api/zap-edus', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createZapEdu = async (zapEdu: ZapEduInterface) => {
  const response = await axios.post('/api/zap-edus', zapEdu);
  return response.data;
};

export const updateZapEduById = async (id: string, zapEdu: ZapEduInterface) => {
  const response = await axios.put(`/api/zap-edus/${id}`, zapEdu);
  return response.data;
};

export const getZapEduById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/zap-edus/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteZapEduById = async (id: string) => {
  const response = await axios.delete(`/api/zap-edus/${id}`);
  return response.data;
};
