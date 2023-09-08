import axios from 'axios';
import queryString from 'query-string';
import { InstanceInterface, InstanceGetQueryInterface } from 'interfaces/instance';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInstances = async (
  query?: InstanceGetQueryInterface,
): Promise<PaginatedInterface<InstanceInterface>> => {
  const response = await axios.get('/api/instances', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInstance = async (instance: InstanceInterface) => {
  const response = await axios.post('/api/instances', instance);
  return response.data;
};

export const updateInstanceById = async (id: string, instance: InstanceInterface) => {
  const response = await axios.put(`/api/instances/${id}`, instance);
  return response.data;
};

export const getInstanceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/instances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInstanceById = async (id: string) => {
  const response = await axios.delete(`/api/instances/${id}`);
  return response.data;
};
