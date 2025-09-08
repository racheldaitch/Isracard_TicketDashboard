import React, { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { StyledTableRow, StyledTableCell } from "../Board.styles";
import { Ticket, TicketPriority, TicketStatus } from "../../models/Ticket";
import PriorityBadge from "../Badge/PriorityBadge";
import { useTicketAnimation } from "../../hooks/useTicketAnimation";
import { useDispatch } from "react-redux";
import { fetchCurrentEditedTicket } from "../../redux/ticketSlice";
import { useTickets } from "../../hooks/useTickets";

interface TicketRowProps {
  ticket: Ticket;
}

const MemoizedTicketRow: React.FC<TicketRowProps> = memo(({ ticket }) => {
  const { handleDeleteTicket } = useTickets();
  const animationClass = useTicketAnimation(true);
  const dispatch = useDispatch();

  return (
    <StyledTableRow className={animationClass} status={ticket.title}>
      <StyledTableCell>{ticket.id}</StyledTableCell>
      <StyledTableCell>{ticket.title}</StyledTableCell>
      <StyledTableCell>{TicketStatus[ticket.status]}</StyledTableCell>

      <StyledTableCell>
        <PriorityBadge priority={ticket.priority as TicketPriority} />
      </StyledTableCell>
      <StyledTableCell>
        {new Date(ticket.createdDate).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell>{ticket.assignedAgent?.name}</StyledTableCell>
      <StyledTableCell>
        <Tooltip title="Delete Ticket">
          <IconButton
            onClick={() => handleDeleteTicket(ticket.id ? ticket.id : 0)}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Ticket">
          <IconButton
            onClick={() => dispatch(fetchCurrentEditedTicket(ticket))}
            size="small"
            color="error"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
});

MemoizedTicketRow.displayName = "MemoizedTicketRow";

export default MemoizedTicketRow;
