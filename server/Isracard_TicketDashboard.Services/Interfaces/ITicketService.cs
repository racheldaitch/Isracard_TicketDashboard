using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Services.Interfaces
{
    public interface ITicketService
    {
        Task<IEnumerable<TicketDto>> GetAllTicketsAsync();

        Task<IEnumerable<TicketDto>> GetFilteredTicketsAsync(TicketQuery query);

        Task AddTicketAsync(TicketDto ticketDto);
        Task<bool> DeleteTicketAsync(int id);

        Task<bool> UpdateTicketAsync(TicketDto ticketDto);

        Task<Ticket?> GetTicketByIdAsync(int ticketId);
    }
}
