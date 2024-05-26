namespace GameStore.api.Dtos;
using System.ComponentModel.DataAnnotations;

public record class UpdateGameDto(
    [Required][StringLength(50)] string Name,
    int GenreId,
    [Range(1,100)] decimal Price,
    string ReleaseDate
);
