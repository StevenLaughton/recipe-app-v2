namespace Recipes.Infrastructure.Dtos;

public class IngredientDto
{
    public int Id { get; set; }
    public decimal Quantity { get; set; }
    public string Text { get; set; }
    public bool IsGroupHeader { get; set; }
}