using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Common.Entities
{
    public class Agent
    {
        [Key] // מגדיר שזה המפתח הראשי
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")] // חובה
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")] // אורך
        public string Name { get; set; }

        [Required] // חובה שיהיו אובייקטים
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    }

}
