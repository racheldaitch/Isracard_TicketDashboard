import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Stack,
  MenuItem,
  Box,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { TicketPriority, TicketStatus } from "../../models/Ticket";
import { useTickets } from "../../hooks/useTickets";

const FilterPanel: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = useState<TicketStatus[]>([]);
  const [priority, setPriority] = React.useState<TicketPriority[]>([]);
  const {
    loading,
    error,
    refreshTickets,
    handleDeleteTicket,
    handleSaveTicket,
  } = useTickets();
  const handleSearch = () => {
    refreshTickets({
      ticketId: undefined,
      title: title || undefined,
      status: status || undefined,
      priority: priority || undefined,
    });
  };

  const handleClear = () => {
    setTitle("");
    setStatus([]);
    setPriority([]);
    refreshTickets();
  };

  const priorityOptions = Object.values(TicketPriority).filter(
    (v) => typeof v === "number"
  ) as number[];

  const statusOptions = Object.values(TicketStatus).filter(
    (v) => typeof v === "number"
  ) as number[];

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }} // במובייל = טור, במסך רחב = שורה
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e: any) => setStatus(e.target.value as TicketStatus[])}
          size="small"
          sx={{ minWidth: 200 }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              (selected as number[])
                .map((val) => TicketStatus[val]) // המרה למחרוזת
                .join(", "),
          }}
        >
          {statusOptions.map((s: number) => (
            <MenuItem key={s} value={s}>
              <Checkbox checked={status.includes(s)} />
              <ListItemText primary={TicketStatus[s]} /> {/* מציג את השם */}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e: any) => setPriority(e.target.value as TicketPriority[])}
          size="small"
          sx={{ minWidth: 200 }}
          SelectProps={{
            multiple: true,
            renderValue: (selected) =>
              (selected as number[])
                .map((val) => TicketPriority[val]) // המרה למחרוזת
                .join(", "),
          }}
        >
          {priorityOptions.map((s: number) => (
            <MenuItem key={s} value={s}>
              <Checkbox checked={priority.includes(s)} />
              <ListItemText primary={TicketPriority[s]} /> {/* מציג את השם */}
            </MenuItem>
          ))}
        </TextField>
        <Box>
          <Button variant="contained" onClick={handleSearch} sx={{ mr: 1 }}>
            Search
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default FilterPanel;
