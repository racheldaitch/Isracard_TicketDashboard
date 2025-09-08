using Isracard_TicketDashboard.Common.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Services.Interfaces
{
    public interface IAgentService
    {
        Task<IEnumerable<AgentDto>> GetAllAgentsAsync();
    }
}
