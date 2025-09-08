using Isracard_TicketDashboard.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Entities
{
    public class Ticket
    {
        [Key] // מפתח ראשי
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Title must be between 2 and 100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, MinimumLength = 5, ErrorMessage = "Description must be between 5 and 500 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public TicketStatus Status { get; set; }

        [Required(ErrorMessage = "Priority is required")]
        public TicketPriority Priority { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public int? AssignedAgentId { get; set; }

        public Agent? AssignedAgent { get; set; }
    }
}
