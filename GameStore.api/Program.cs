using GameStore.api.Data;
using GameStore.api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(option =>{
    option.AddPolicy("AllowSpecificOrigin",
    builder => builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());

});

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlServer<GameStoreContext>(connString);

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.MapGamesEndpoints();
app.MapGenreEndpoints();

await app.MigrateDbAsync();

app.Run();
