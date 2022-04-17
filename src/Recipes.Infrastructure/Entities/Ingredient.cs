namespace Recipes.Infrastructure.Entities;

public class Ingredient
{
    public int Id { get; set; }
    public decimal Quantity { get; set; }
    public string Text { get; set; }
    public bool IsGroupHeader { get; set; }

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; }
}