import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ticketReducer from "./redux/ticketSlice";
import agentReducer from "./redux/agentSlice";
import { configureStore } from "@reduxjs/toolkit";
import "./index.css";

import { Provider } from "react-redux";

// interceptors.create();
const dashboardTicketsStore = configureStore({
  reducer: {
    tickets: ticketReducer,
    agents:agentReducer
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={dashboardTicketsStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
