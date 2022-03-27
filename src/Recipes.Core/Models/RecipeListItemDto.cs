using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Models;

public class RecipeListItemDto
{
    public int RecipeId { get; set; }
    public string Name { get; set; }
    public byte[]? ImageData { get; set; }

    public static RecipeListItemDto MapFromRecipe(Recipe recipe)
    {
        return new RecipeListItemDto
        {
            RecipeId = recipe.Id,
            Name = recipe.Name,
            ImageData = recipe?.Image.ImageData
        };
    }
}