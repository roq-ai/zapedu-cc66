import axios from 'axios';
import queryString from 'query-string';
import { AgentInterface, AgentGetQueryInterface } from 'interfaces/agent';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAgents = async (query?: AgentGetQueryInterface): Promise<PaginatedInterface<AgentInterface>> => {
  const response = await axios.get('/api/agents', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAgent = async (agent: AgentInterface) => {
  const response = await axios.post('/api/agents', agent);
  return response.data;
};

export const updateAgentById = async (id: string, agent: AgentInterface) => {
  const response = await axios.put(`/api/agents/${id}`, agent);
  return response.data;
};

export const getAgentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/agents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAgentById = async (id: string) => {
  const response = await axios.delete(`/api/agents/${id}`);
  return response.data;
};
