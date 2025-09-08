import axios from 'axios';
import { Agent } from '../models/Agent';
//TO DO - move to config
const API_BASE_URL = 'http://localhost:5222/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllAgents = async (): Promise<Agent[]> => {
    const response = await api.get('/agents');
    return response.data;
};

