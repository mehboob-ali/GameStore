using GameStore.api.Dtos;
using GameStore.api.Entities;

namespace GameStore.api.Mapping;

public static class GenreMappings
{
    public static GenreDetailsDto ToGenreDetailsDto(this Genre genre)
    {
        return new(
            genre.Id,
            genre.Name
        );

    }

}
