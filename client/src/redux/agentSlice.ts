import { Ticket } from "@/models/Ticket";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { Agent } from "http";

export interface AgentState {
  agents: Agent[];
}

const initialState: AgentState = {
  agents: [],
};

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    fetchAgents: (state, action) => {
      state.agents = action.payload; // מקבל מערך ישירות
    },
  },
});

export const { fetchAgents } = agentSlice.actions;

export default agentSlice.reducer;
