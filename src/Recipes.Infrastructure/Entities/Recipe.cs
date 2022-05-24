using Recipes.Infrastructure.Enums;
using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Entities;

public class Recipe : IRecipe
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }
    public Fare Fare { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    public ICollection<Step> Steps { get; set; } = new List<Step>();
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
}