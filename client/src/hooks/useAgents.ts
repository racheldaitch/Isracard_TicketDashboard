import { useState, useCallback, useEffect } from "react";
import { Agent } from "../models/Agent";
import { getAllAgents } from "../api/agentApi";
import { useDispatch } from "react-redux";
import { fetchAgents } from "../redux/agentSlice";

interface UseAgentsReturn {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}

export const useAgents = (): UseAgentsReturn => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    agentApi();
  }, []);

  const agentApi = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllAgents();
      setAgents(data);
      dispatch(fetchAgents(data));
      setError(null);
    } catch (err) {
      setError("Failed to fetch agents");
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    agents,
    loading,
    error,
  };
}; // handleEditTicket
