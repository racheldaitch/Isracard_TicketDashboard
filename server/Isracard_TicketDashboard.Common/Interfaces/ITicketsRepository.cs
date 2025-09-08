using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Enums;
using Isracard_TicketDashboard.Common.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Interfaces
{
    public interface ITicketsRepository
    {
        Task<IEnumerable<Ticket>> GetAllAsync();
        Task<IEnumerable<Ticket>> GetFilteredTicketsAsync(TicketQuery query);
        Task<bool> DeleteAsync(int id);
        Task<Ticket?> GetTicketByIdAsync(int ticketId);
        Task AddTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int ticketId);
    }

}
