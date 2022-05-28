using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Dtos;

public class IngredientDto : IIngredient
{
    public int Id { get; set; }
    public decimal? Quantity { get; set; }
    public string Text { get; set; } = null!;
    public bool IsGroupHeader { get; set; }
}