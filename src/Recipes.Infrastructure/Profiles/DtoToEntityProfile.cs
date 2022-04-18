using AutoMapper;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Profiles;

public class DtoToEntityProfile: Profile
{
    public DtoToEntityProfile()
    {
        CreateMap<IngredientDto, Ingredient>();
        CreateMap<StepDto, Step>();
        CreateMap<RecipeImageDto, RecipeImage>();
        CreateMap<TagDto, Tag>();
        CreateMap<RecipeDto, Recipe>();
    }
}