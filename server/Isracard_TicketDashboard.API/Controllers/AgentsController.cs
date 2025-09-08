using Isracard_TicketDashboard.Common.Queries;
using Isracard_TicketDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Isracard_TicketDashboard.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly IAgentService _agentService;

        public AgentsController(IAgentService agentService)
        {
            _agentService = agentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var agents = await _agentService.GetAllAgentsAsync();
            return Ok(agents);
        }
    }
}
