using Microsoft.AspNetCore.Http;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;
using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Dtos;

public class RecipeDto : IRecipe
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }
    public Fare Fare { get; set; }
    public IFormFile? Image { get; set; } 
    public string? ImageUrl { get; set; }

    public IEnumerable<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();

    public IEnumerable<StepDto> Steps { get; set; } = new List<StepDto>();

    public IEnumerable<TagDto> Tags { get; set; } = new List<TagDto>();

    public Recipe MapToEntity(Recipe entity)
    {
        entity.Name = Name;
        entity.Portions = Portions;
        entity.IsVegetarian = IsVegetarian;
        entity.Fare = Fare;
        entity.Ingredients = Ingredients.Select(i => new Ingredient
        {
            Quantity = i.Quantity,
            Text = i.Text,
            IsGroupHeader = i.IsGroupHeader
        }).ToList();
        entity.Steps = Steps.Select(s => new Step
        {
            Text = s.Text,
            IsGroupHeader = s.IsGroupHeader
        }).ToList();

        return entity;
    }
}