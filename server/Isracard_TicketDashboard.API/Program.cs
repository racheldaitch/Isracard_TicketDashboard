using Isracard_TicketDashboard.API.Hubs;
using Isracard_TicketDashboard.API.Middleware;
using Isracard_TicketDashboard.Common.Interfaces;
using Isracard_TicketDashboard.Infrastructure.Data;
using Isracard_TicketDashboard.Infrastructure.Mapping;
using Isracard_TicketDashboard.Infrastructure.Repositories;
using Isracard_TicketDashboard.Services.Interfaces;
using Isracard_TicketDashboard.Services.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // כתובת ה‑React שלך
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // קריטי!
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TicketDashboardContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
builder.Services.AddScoped<ITicketsRepository, TicketsRepository>();
builder.Services.AddScoped<IAgentsRepository, AgentsRepository>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<IAgentService, AgentService>();
builder.Services.AddSignalR();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");


app.UseAuthorization();
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.MapControllers();
app.MapHub<TicketsHub>("/ticketsHub").RequireCors("CorsPolicy");

app.Run();
