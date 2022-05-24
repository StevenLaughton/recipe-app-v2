using AutoMapper;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Profiles;

public class EntityToDtoProfile : Profile
{
    public EntityToDtoProfile()
    {
        CreateProjection<Ingredient, IngredientDto>();
        CreateProjection<Step, StepDto>();
        CreateProjection<Tag, TagDto>();
        CreateProjection<Recipe, RecipeDto>()
            .ForMember(c => c.Ingredients, o => o.MapFrom(s => s.Ingredients))
            .ForMember(c => c.Steps, o => o.MapFrom(s => s.Steps));
        CreateProjection<Recipe, RecipeListItemDto>()
            .ForMember(dest => dest.RecipeId, act => act.MapFrom(src => src.Id));
    }
}