import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Ticket } from "../models/Ticket";

export function useSafeTicketsHub() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    // בונים את החיבור ל-Hub
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5222/ticketsHub")
      .withAutomaticReconnect() // חשוב! מתחבר אוטומטית במקרה של ניתוק
      .build();

    setConnection(hubConnection);

    // התחברות
    const startConnection = async () => {
      try {
        await hubConnection.start();
        console.log("SignalR connected");

        // מאזינים לאירועים מהשרת
        hubConnection.on("ReceiveTicket", (ticket: Ticket) => {
          setTickets((prev: Ticket[]) => {
            // מעדכנים או מוסיפים את הטיקט
            const idx = prev.findIndex((t) => t.id === ticket.id);
            if (idx !== -1) {
              const copy = [...prev];
              copy[idx] = ticket;
              return copy;
            }
            return [...prev, ticket];
          });
        });

        hubConnection.on("ticketDeleted", (ticketId: number) => {
          setTickets((prev: Ticket[]) => {
            // מעדכנים או מוסיפים את הטיקט
            const tick = prev.filter((t) => t.id != ticketId);

            return tick;
          });
        });
      } catch (err) {
        setTimeout(startConnection, 5000);
        console.log("SignalR connection failed:", err);
      }
    };

    startConnection();

    // ניקוי בזמן unmount
    return () => {
      hubConnection.stop();
    };
  }, []);

  return { tickets, setTickets, connection };
}
