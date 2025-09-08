using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Queries
{
    public class TicketQuery
    {
        public int? TicketId { get; set; }
        public List<int>? Status { get; set; }
        
        public string? Title { get; set; }
        public List<int>? Priority { get; set; } // אפשר להוסיף פילטר נוסף
    }

}
