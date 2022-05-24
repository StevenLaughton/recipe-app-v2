namespace Recipes.Infrastructure.Dtos;

public record ImageDto
(
    byte[] Data,
    string Filename
);