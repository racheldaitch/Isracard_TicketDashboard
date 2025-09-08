using AutoMapper;
using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Services.Services
{
    public class AgentService : IAgentService
    {
        private readonly IAgentsRepository _agentsRepository;
        private readonly IMapper _mapper;

        public AgentService(IAgentsRepository agentRepository, IMapper mapper)
        {
            _agentsRepository = agentRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<AgentDto>> GetAllAgentsAsync()
        {
            var agents = await _agentsRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AgentDto>>(agents);
        }
    }
}
