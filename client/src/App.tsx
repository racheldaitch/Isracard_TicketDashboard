import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Button,
} from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "./styles/theme";
import FilterPanel from "./components/Ticket/FilterPanel";
import ErrorBoundary from "./components/System/ErrorBoundary";
import "./App.css";
import "./styles/animations.css";
import { useDispatch } from "react-redux";
import TicketForm from "./components/Ticket/TicketForm";
import { fetchCurrentEditedTicket } from "./redux/ticketSlice";
import TicketBoard from "./components/Ticket/TicketsBoard";

const App: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          {
            <Container maxWidth="lg">
              <Box sx={{ my: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <h1>Ticket Dashboard</h1>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(fetchCurrentEditedTicket(undefined));
                    }}
                  >
                    Add Ticket
                  </Button>
                </Box>

                <FilterPanel />

                <TicketBoard />

                <TicketForm />
              </Box>
            </Container>
          }
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
