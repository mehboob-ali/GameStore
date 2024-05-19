using GameStore.api.Data;
using GameStore.api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlServer<GameStoreContext>(connString);
var app = builder.Build();

app.MapGamesEndpoints();
app.MapGenreEndpoints();
await app.MigrateDbAsync();

app.Run();
