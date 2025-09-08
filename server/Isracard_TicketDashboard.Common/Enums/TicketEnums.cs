using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Enums
{
    public enum TicketStatus
    {
        New,
        InProgress,
        Resolved
    }

    public enum TicketPriority
    {
        Low,
        Medium,
        High,
        Critical
    }
}
