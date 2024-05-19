using GameStore.api.Data;
using GameStore.api.Mapping;
using Microsoft.EntityFrameworkCore;

namespace GameStore.api.Endpoints;

public static class GenreEndpoints
{

    public static RouteGroupBuilder MapGenreEndpoints(this WebApplication app){

        var group = app.MapGroup("genres")
        .WithParameterValidation();
        group.MapGet("/", async(GameStoreContext dbContext) => 
        await dbContext.Genres
        .Select(game=>game.ToGenreDetailsDto())
        .AsNoTracking()
        .ToListAsync() );
        
    return group;

    }
    
}
