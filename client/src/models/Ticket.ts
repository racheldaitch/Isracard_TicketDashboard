export interface Ticket {
  id?: number;
  title?: string;
  description?: string;
  status: TicketStatus;
  priority?: TicketPriority;
  createdDate: Date;
  assignedAgent?: any;
  assignedAgentId?: number;
}

export interface TicketsFilter {
  ticketId?: number;
  priority?: TicketPriority[];
  status?: TicketStatus[];
  title?: string;
}

export enum TicketStatus {
  New, // 0
  InProgress, // 1
  Resolved, // 2
}

export enum TicketPriority {
  Low,
  Medium,
  High,
  Critical,
}
