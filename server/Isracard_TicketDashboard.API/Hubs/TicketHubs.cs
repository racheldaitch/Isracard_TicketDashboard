using Microsoft.AspNetCore.Mvc;

namespace Isracard_TicketDashboard.API.Hubs
{
    using Microsoft.AspNetCore.SignalR;

    public class TicketsHub : Hub
    {
        // שליחת הודעה לכל הלקוחות
        public async Task SendTicketUpdate(string message)
        {
            await Clients.All.SendAsync("ReceiveTicketUpdate", message);
        }
    }

}
