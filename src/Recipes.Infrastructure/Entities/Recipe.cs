using System.Linq.Expressions;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Enums;
using Recipes.Infrastructure.Interfaces;

namespace Recipes.Infrastructure.Entities;

public class Recipe : IRecipe
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Portions { get; set; }
    public bool IsVegetarian { get; set; }
    public Fare Fare { get; set; }
    public string? ImageUrl { get; set; }
    public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    public ICollection<Step> Steps { get; set; } = new List<Step>();
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();

    public static Expression<Func<Recipe, RecipeDto>> MapToDto()
    {
        return recipe => new RecipeDto
        {
            Id = recipe.Id,
            Name = recipe.Name,
            Portions = recipe.Portions,
            IsVegetarian = recipe.IsVegetarian,
            Fare = recipe.Fare,
            Ingredients = recipe.Ingredients.AsQueryable().Select(i => new IngredientDto
            {
                Id = i.Id,
                Quantity = i.Quantity,
                Text = i.Text,
                IsGroupHeader = i.IsGroupHeader
            }),
            Steps = recipe.Steps.AsQueryable().Select(s => new StepDto
            {
                Id = s.Id,
                Text = s.Text,
                IsGroupHeader = s.IsGroupHeader
            }),
            Tags = recipe.Tags.AsQueryable().Select(tag => new TagDto
            {
                Id = tag.Id,
                Title = tag.Title
            })
        };
    }
}