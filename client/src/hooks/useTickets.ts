import { useState, useEffect, useCallback, useRef } from "react";
import { TicketsFilter, Ticket } from "../models/Ticket";
import {
  addTicket,
  deleteTicket,
  editTicket,
  getAllTickets,
  getFilteredTickets,
} from "../api/ticketApi";
import { useSafeTicketsHub } from "./useTicketsHub";
import { useDispatch } from "react-redux";
import { fetchTickets } from "../redux/ticketSlice";

interface UseTicketReturn {
  loading: boolean;
  error: string | null;
  refreshTickets: (filter?: TicketsFilter) => Promise<void>;
  handleDeleteTicket: (id: number) => Promise<void>;
  handleSaveTicket: (ticketData: Ticket) => Promise<void>;
}

export const useTickets = (): UseTicketReturn => {
  const dispatch = useDispatch();
  const { setTickets, connection } = useSafeTicketsHub();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTickets = useCallback(async (filter?: TicketsFilter) => {
    setTickets((prev: any) => prev);

    try {
      setLoading(true);

      const data = filter
        ? await getFilteredTickets(filter)
        : await getAllTickets();
      setTickets(data);
      dispatch(fetchTickets(data));

      setError(null);
    } catch (err) {
      setError("Failed to fetch tickets");
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  const handleSaveTicket = useCallback(async (ticketData: Ticket) => {
    try {
      if (ticketData.id) {
        await editTicket(ticketData);
      } else {
        await addTicket(ticketData);
      }
      refreshTickets();
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  }, []);
  const handleDeleteTicket = useCallback(async (id: number) => {
    try {
      await deleteTicket(id);
      refreshTickets();
    } catch (err) {
      setError("Failed to delete ticket");
      console.error("Error deleting ticket:", err);
    }
  }, []);

  useEffect(() => {
    refreshTickets();
  }, [refreshTickets]);

  return {
    loading,
    error,
    refreshTickets,
    handleDeleteTicket,
    handleSaveTicket,
  };
};
