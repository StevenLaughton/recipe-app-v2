namespace Recipes.Infrastructure.Entities;

public class Ingredient
{
    public int Id { get; set; }

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; }
}