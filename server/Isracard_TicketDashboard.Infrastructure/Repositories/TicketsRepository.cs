using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Enums;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Common.Queries;
using Isracard_TicketDashboard.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Infrastructure.Repositories
{
    public class TicketsRepository : ITicketsRepository
    {
        private readonly TicketDashboardContext _context;

        public TicketsRepository(TicketDashboardContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Ticket>> GetAllAsync()
        {
            return await _context.Tickets
                .OrderBy(f => f.CreatedDate)
                .Include(f => f.AssignedAgent)
                .ToListAsync();
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return false;
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }

        // שליפה עם פילטרים אופציונליים


        public async Task<Ticket?> GetTicketByIdAsync(int ticketId)
        {
            return await _context.Tickets.FindAsync(ticketId);
        }

        public async Task AddTicketAsync(Ticket ticket)
        {
            ticket.CreatedDate = DateTime.UtcNow;
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTicketAsync(int ticketId)
        {
            var ticket = await _context.Tickets.FindAsync(ticketId);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Ticket>> GetFilteredTicketsAsync(TicketQuery query)
        {
            IQueryable<Ticket> ticketQuery = _context.Tickets.AsQueryable();

            if (query.TicketId.HasValue)
                ticketQuery = ticketQuery.Where(t => t.Id == query.TicketId.Value);

            if (query.Status != null && query.Status.Count > 0)
                ticketQuery = ticketQuery.Where(t => query.Status.Contains((int)t.Status));

            if (query.Priority != null && query.Priority.Count > 0)
                ticketQuery = ticketQuery.Where(t => query.Priority.Contains((int)t.Priority));

            if (!string.IsNullOrEmpty(query.Title))
                ticketQuery = ticketQuery.Where(t => t.Title.Contains(query.Title));

            return await ticketQuery
                .OrderByDescending(t => t.CreatedDate).Include(f => f.AssignedAgent)
                .ToListAsync();
        }
    }
}


