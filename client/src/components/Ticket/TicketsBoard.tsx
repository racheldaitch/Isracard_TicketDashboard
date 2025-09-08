import React, { memo } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  TableContainer,
} from "@mui/material";
import { StyledPaper, StyledTableCell } from "../Board.styles";
import MemoizedTicketRow from "./MemoTicketRow";
import { Ticket } from "../../models/Ticket";
import { useSelector } from "react-redux";
import { useTickets } from "../../hooks/useTickets";

const TicketBoard: React.FC = () => {
  const { loading, error, handleDeleteTicket } = useTickets();
  const tickets = useSelector((state: any) => {
    console.log(state); // תראי איך המבנה באמת נראה
    return state.tickets?.tickets;
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <StyledPaper elevation={3}>
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Creation Date</StyledTableCell>
              <StyledTableCell>Assigen To</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets &&
              tickets.length > 0 &&
              tickets.map((ticket: Ticket) => (
                <MemoizedTicketRow key={ticket.id} ticket={ticket} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};
TicketBoard.displayName = "TicketBoard";

export default TicketBoard;
