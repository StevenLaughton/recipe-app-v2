namespace Recipes.Infrastructure.Interfaces;

public interface IIngredient
{
    int Id { get; set; }
    decimal? Quantity { get; set; }
    string Text { get; set; }
    bool IsGroupHeader { get; set; }
}