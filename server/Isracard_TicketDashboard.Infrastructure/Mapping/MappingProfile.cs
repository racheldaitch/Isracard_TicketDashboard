using AutoMapper;
using Isracard_TicketDashboard.Common.DTOs;
using Isracard_TicketDashboard.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Isracard_TicketDashboard.Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Ticket, TicketDto>();
            CreateMap<TicketDto, Ticket>();
            CreateMap<AgentDto, Agent>();
            CreateMap<Agent, AgentDto>();
        }
    }
}
