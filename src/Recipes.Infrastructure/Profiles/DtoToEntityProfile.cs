using AutoMapper;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Profiles;

public class DtoToEntityProfile: Profile
{
    public DtoToEntityProfile()
    {
        CreateMap<Ingredient, IngredientDto>();
        CreateMap<Step, StepDto>();
        CreateMap<RecipeImage, RecipeImageDto>();
        CreateMap<Tag, TagDto>();
        CreateMap<Recipe, RecipeDto>();
    }
}