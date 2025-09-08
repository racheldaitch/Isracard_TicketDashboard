import { Ticket } from "@/models/Ticket";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface TicketState {
  tickets: Ticket[];
  currentTicket: Ticket | undefined;
  ticketFormOpen: boolean;
}

const initialState: TicketState = {
  tickets: [],
  currentTicket: undefined,
  ticketFormOpen: false,
};

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    fetchTickets: (state, action) => {
      state.tickets = action.payload; // מקבל מערך ישירות
    },
    fetchCurrentEditedTicket: (state, action) => {
      state.ticketFormOpen = true;
      state.currentTicket = action.payload;
    },

    fetchTicketFormOpen: (state, action) => {
      state.ticketFormOpen = action.payload;
    },
  },
});

export const { fetchTickets, fetchCurrentEditedTicket, fetchTicketFormOpen } =
  ticketSlice.actions;

export default ticketSlice.reducer;
