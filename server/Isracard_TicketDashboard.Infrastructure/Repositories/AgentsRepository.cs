using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Infrastructure.Repositories
{
    public class AgentsRepository: IAgentsRepository
    {
        private readonly TicketDashboardContext _context;

        public AgentsRepository(TicketDashboardContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Agent>> GetAllAsync()
        {
            return await _context.Agents
                .OrderBy(f => f.Id)
                .ToListAsync();
        }

       
    }
}
