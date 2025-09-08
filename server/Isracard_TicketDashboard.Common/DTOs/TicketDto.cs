using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.DTOs
{
    public class TicketDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
        public TicketPriority Priority { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? AssignedAgentId { get; set; }
        public AgentDto? AssignedAgent { get; set; }
    }
}
