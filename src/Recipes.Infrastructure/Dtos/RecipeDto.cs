using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Dtos;

public class RecipeDto: IRecipe
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }

    public RecipeImageDto? Image { get; set; }
    
    public ICollection<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
    
    public ICollection<StepDto> Steps { get; set; } = new List<StepDto>();
    
    public ICollection<TagDto> Tags { get; set; } = new List<TagDto>();
}