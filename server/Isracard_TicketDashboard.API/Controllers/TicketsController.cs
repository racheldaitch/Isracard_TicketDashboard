using Isracard_TicketDashboard.API.Hubs;
using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Common.Queries;
using Isracard_TicketDashboard.Services.Interfaces;
using Isracard_TicketDashboard.Services.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Net.Sockets;

namespace Isracard_TicketDashboard.API.Controllers
{


        [ApiController]
        [Route("api/[controller]")]
        public class TicketsController : ControllerBase
        {
            private readonly ITicketService _ticketsService;
        private readonly IHubContext<TicketsHub> _hubContext;

        public TicketsController(ITicketService ticketsService, IHubContext<TicketsHub> hubContext)
            {
            _ticketsService = ticketsService;
            _hubContext = hubContext;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await _ticketsService.GetAllTicketsAsync();
            return Ok(tickets);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredTicketsAsync([FromQuery]TicketQuery query)
        {
            var tickets = await _ticketsService.GetFilteredTicketsAsync(query);
            return Ok(tickets);
        }

        //// GET: api/Ticket/{id}
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTicket(int id)
        //{
        //    var ticket = await _ticketsService.GetTicketByIdAsync(id);
        //    if (ticket == null) return NotFound();
        //    return Ok(ticket);
        //}

        //// POST: api/Ticket
        [HttpPost("CreateTicket")]
        public async Task<IActionResult> CreateTicket([FromBody]TicketDto ticket)
        {
            if (ticket == null) return BadRequest();

            await _ticketsService.AddTicketAsync(ticket);
            await _hubContext.Clients.All.SendAsync("ReceiveTicket", ticket);
            return CreatedAtAction(nameof(TicketDto), new { id = ticket.Id }, ticket);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var result = await _ticketsService.DeleteTicketAsync(id);
            await _hubContext.Clients.All.SendAsync("ticketDeleted", id);
            return Ok(result);
        }

        //// PUT: api/Ticket/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id,[FromBody] TicketDto ticket)
        {
            if (id != ticket.Id)
            {
                return BadRequest("Mismatched ticket id");
            }

            var updated = await _ticketsService.UpdateTicketAsync(ticket);

            if (!updated)
            {
                return NotFound();
            }
            await _hubContext.Clients.All.SendAsync("ReceiveTicket", ticket);
            return NoContent();
        }

        //// DELETE: api/Ticket/{id}
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTicket(int id)
        //{
        //    var existing = await _ticketsService.GetTicketByIdAsync(id);
        //    if (existing == null) return NotFound();

        //    await _ticketsService.DeleteTicketAsync(id);
        //    return NoContent();
        //}
    }
    }

