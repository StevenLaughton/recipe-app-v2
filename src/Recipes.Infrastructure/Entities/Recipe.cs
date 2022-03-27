namespace Recipes.Infrastructure.Entities;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }
    public RecipeImage Image { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    public ICollection<Tag> Tags { get; set; }
}