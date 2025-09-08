# Isracard Ticket Dashboard

A ticket management system for internal use at Isracard.

## Description
This system allows you to:
- Create, update, and delete tickets
- Categorize tickets by status and priority
- Assign tickets to agents
- Receive real-time updates using SignalR

## Technologies
- .NET Core / ASP.NET Core
- Entity Framework Core
- React / TypeScript
- Material UI
- SignalR

## Installation & Run
Clone the repository:
```bash
git clone https://github.com/yourusername/Isracard_TicketDashboard.git
```

Navigate to the project folder:
```bash
cd Isracard_TicketDashboard
```

Install frontend dependencies:
```bash
cd frontend
npm install
npm start
```

Run the API server:
```bash
cd ../server
dotnet restore
dotnet run
```
## Usage

Once the system is running, open the dashboard at:

http://localhost:3000


Create, edit, and assign tickets in real time.

## Contributing

To contribute or fix issues:

Create a new branch:

git checkout -b feature/your-feature-name


Commit your changes:

git commit -m "Add some feature"


Push to the branch:

git push origin feature/your-feature-name


Open a Pull Request on GitHub
