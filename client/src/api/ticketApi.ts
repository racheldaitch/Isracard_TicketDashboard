import axios from 'axios';
import {TicketsFilter, Ticket } from '../models/Ticket';
//TO DO - move to config
const API_BASE_URL = 'http://localhost:5222/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAllTickets = async (): Promise<Ticket[]> => {
    const response = await api.get('/Tickets/all');
    return response.data;
};

export const getFilteredTickets = async (filter: TicketsFilter): Promise<Ticket[]> => {
   const params = new URLSearchParams();

  if (filter.priority) {
    filter.priority.forEach(p => params.append("Priority", p.toString()));
  }

  if (filter.status) {
    filter.status.forEach(s => params.append("Status", s.toString()));
  }

  if (filter.ticketId) params.append("TicketId", filter.ticketId.toString());
  if (filter.title) params.append("Title", filter.title);

const response = await api.get(`/tickets/filter?${params.toString()}`);
  return response.data;
};

export const addTicket = async (ticket: Ticket): Promise<Ticket> => {
    ticket.assignedAgentId = ticket.assignedAgent.id;
    ticket.assignedAgent = undefined;
    const response = await api.post('/tickets/createTicket', ticket);
    return response.data;
};

export const editTicket = async (ticket: Ticket): Promise<Ticket> => {
    ticket.assignedAgentId = ticket.assignedAgent.id;
    ticket.assignedAgent = undefined;
  const response = await api.put(`/tickets/${ticket.id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id: number): Promise<void> => {
    await api.delete(`/tickets/${id}`);
};