using Isracard_TicketDashboard.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Interfaces
{
    public interface IAgentsRepository
    {
        Task<IEnumerable<Agent>> GetAllAsync();
    }
}
