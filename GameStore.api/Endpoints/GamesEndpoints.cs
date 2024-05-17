using GameStore.api.Dtos;

namespace GameStore.api.Endpoints;

public static class GamesEndpoints
{
    const string GetGameEndPointName = "GetGame";
    private readonly static List<GameDto> games = [
        new(
            1,
            "Street Fighter II",
            "action",
            9.99M,
            new DateOnly(1972, 7,14)
        ),
        new(
            2,
            "Prince of Persia: The Sands of Time",
            "adventure",
            4.99M,
            new DateOnly(2000, 1, 9)
        ),
        new(
            3,
            "Resident Evil 4",
            "Horror",
            8.00M,
            new DateOnly(2004, 3, 12)
        )
    ];

    public static RouteGroupBuilder MapGamesEndpoints(this WebApplication app){

        var group = app.MapGroup("games")
        .WithParameterValidation();
        
        //Get /games
        group.MapGet("/", ()=> games);

        //GET /games/1
        group.MapGet("/{id}", (int id)=> 
            {
                GameDto? game = games.Find(game=>game.Id==id);
                return game is null ? Results.NotFound() : Results.Ok(game);
            })
            .WithName(GetGameEndPointName);
        
        //POST /games
        group.MapPost("/", (CreateGameDto newGame)=>{
            GameDto game = new(
                games.Count+1,
                newGame.Name,
                newGame.Genre,
                newGame.Price,
                newGame.ReleaseDate
            );

            games.Add(game);
            return Results.CreatedAtRoute(GetGameEndPointName, new {id = game.Id }, game);
        });
        

        //PUT /games

        group.MapPut("/{id}", (int id, UpdateGameDto updatedGame)=>{
            var index = games.FindIndex(game => game.Id ==id);
            if(index == -1){
                return Results.NotFound();
            }
            games[index] = new GameDto(
                id,
                updatedGame.Name,
                updatedGame.Genre,
                updatedGame.Price,
                updatedGame.ReleaseDate
            );

            return Results.NoContent();

        });

        //DELETE /games/1

        group.MapDelete("/{id}", (int id)=>{
            games.RemoveAll(game=> game.Id == id);
            return Results.NoContent();
        });

        return group;

        }

}
