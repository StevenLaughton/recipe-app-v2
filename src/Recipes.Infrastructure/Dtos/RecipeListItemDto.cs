namespace Recipes.Infrastructure.Dtos;

public class RecipeListItemDto
{
    public int RecipeId { get; set; }
    public string Name { get; set; } = null!;
    public string? ImageUrl { get; set; }
}