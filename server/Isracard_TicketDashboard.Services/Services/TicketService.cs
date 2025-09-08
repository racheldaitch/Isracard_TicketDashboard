using AutoMapper;
using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Entities;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Common.Queries;
using Isracard_TicketDashboard.Services.Interfaces;
using System.Net.Sockets;

namespace Isracard_TicketDashboard.Services.Services
{
    public class TicketService: ITicketService
    {
        private readonly ITicketsRepository _ticketsRepository;
        private readonly IMapper _mapper;

        public TicketService(ITicketsRepository ticketsRepository, IMapper mapper)
        {
            _ticketsRepository = ticketsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketDto>> GetAllTicketsAsync()
        {
            var tickets = await _ticketsRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task<IEnumerable<TicketDto>> GetFilteredTicketsAsync(TicketQuery query)
        {
            var tickets = await _ticketsRepository.GetFilteredTicketsAsync(query);
            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task AddTicketAsync(TicketDto ticketDto)
        {
            var ticket = _mapper.Map<Ticket>(ticketDto);
            await _ticketsRepository.AddTicketAsync(ticket);
        }

        public async Task<bool> UpdateTicketAsync(TicketDto ticketDto)
        {
            var ticket = await _ticketsRepository.GetTicketByIdAsync(ticketDto.Id);

            if (ticket == null)
                return false;

            // עדכון ערכים
            ticket.Title = ticketDto.Title;
            ticket.Description = ticketDto.Description;
            ticket.Status = ticketDto.Status;
            ticket.Priority = ticketDto.Priority;
            ticket.AssignedAgentId = ticketDto.AssignedAgentId;

            await _ticketsRepository.UpdateTicketAsync(ticket);

            return true;
        }

        public async Task<Ticket?> GetTicketByIdAsync(int ticketId)
        {
           return await _ticketsRepository.GetTicketByIdAsync(ticketId);
        }

        public async Task<bool> DeleteTicketAsync(int id)
        {
            var result = await _ticketsRepository.DeleteAsync(id);
            return result;
        }
    }

}
