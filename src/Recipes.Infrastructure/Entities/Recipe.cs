namespace Recipes.Infrastructure.Entities;

public class Recipe
{
    public int Id { get; set; }

    public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
}