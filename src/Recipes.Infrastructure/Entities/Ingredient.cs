using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Entities;

public class Ingredient : IIngredient
{
    public int Id { get; set; }
    public decimal? Quantity { get; set; }
    public string Text { get; set; } = null!;
    public bool IsGroupHeader { get; set; }

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } = null!;
}