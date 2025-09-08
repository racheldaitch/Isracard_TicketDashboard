import React from "react";
import { TicketPriority } from "../../models/Ticket"; // או הקובץ שבו הגדרת את ה‑enum

interface PriorityBadgeProps {
  priority: TicketPriority;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  let color = "";

  switch (priority) {
    case TicketPriority.Critical:
      color = "red";
      break;
    case TicketPriority.High:
      color = "orange";
      break;
    case TicketPriority.Medium:
      color = "yellow";
      break;
    case TicketPriority.Low:
      color = "green";
      break;
    default:
      color = "gray";
  }

  return (
    <span
      style={{
        backgroundColor: color,
        color: "black",
        padding: "4px 8px",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "0.8rem",
      }}
    >
      {TicketPriority[priority]}
    </span>
  );
};

export default PriorityBadge;
