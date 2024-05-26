using GameStore.api.Dtos;
using GameStore.api.Entities;
using System.Globalization;
namespace GameStore.api.Mapping;

public static class GameMapping
{
    public static Game ToEntity(this CreateGameDto game)
    {
        DateOnly releaseDate;
        if(!DateOnly.TryParseExact(game.ReleaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out releaseDate))
        {
            throw new ArgumentException("Invalid date format. Use yyyy-MM-dd."); 
        }
        return new Game()
        {
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = releaseDate
        };
    }

    public static Game ToEntity(this UpdateGameDto game, int id)
    {
        DateOnly releaseDate;
        if(!DateOnly.TryParseExact(game.ReleaseDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out releaseDate))
        {
            throw new ArgumentException("Invalid date format. Use yyyy-MM-dd."); 
        }
        return new Game()
        {
            Id = id,
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = releaseDate
        };
    }    

    public static GameSummaryDto ToGameSummaryDto(this Game game)
    {
        return new(
            game.Id,
            game.Name,
            game.Genre!.Name,
            game.Price,
            game.ReleaseDate
        );
    }

    public static GameDetailsDto ToGameDetailsDto(this Game game)
    {
        return new(
            game.Id,
            game.Name,
            game.GenreId,
            game.Price,
            game.ReleaseDate
        );
    }    
}
