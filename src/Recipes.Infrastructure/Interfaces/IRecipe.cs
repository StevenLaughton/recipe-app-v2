using Recipes.Infrastructure.Enums;

namespace Recipes.Infrastructure.Interfaces;

public interface IRecipe
{
    public string Name { get; set; }
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }
    public Fare Fare { get; set; }
    public string? ImageUrl { get; set; }

}