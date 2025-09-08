using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Enums;
using Microsoft.EntityFrameworkCore;


namespace Isracard_TicketDashboard.Infrastructure.Data
{

    public class TicketDashboardContext : DbContext
    {
        public TicketDashboardContext(DbContextOptions<TicketDashboardContext> options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Agent> Agents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // כאן שמים את ה-Fluent API
            modelBuilder.Entity<Ticket>()
                    .HasOne(t => t.AssignedAgent)
                    .WithMany(a => a.Tickets)
                    .HasForeignKey(t => t.AssignedAgentId)
                    .OnDelete(DeleteBehavior.SetNull);

            base.OnModelCreating(modelBuilder);

            // Agents
            modelBuilder.Entity<Agent>().HasData(
                new Agent { Id = 1, Name = "David Roth" },
                new Agent { Id = 2, Name = "Beni Gordon" }
            );

            // Tickets
            modelBuilder.Entity<Ticket>().HasData(
                new Ticket
                {
                    Id = 1,
                    Title = "Login not working",
                    Description = "User cannot log in to the system",
                    Status = TicketStatus.New,
                    Priority = TicketPriority.High,
                    AssignedAgentId = 1
                },
                new Ticket
                {
                    Id = 2,
                    Title = "Page load slow",
                    Description = "Dashboard takes too long to load",
                    Status = TicketStatus.InProgress,
                    Priority = TicketPriority.Medium,
                    AssignedAgentId = 2
                }
            );
        }



    }
}


