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
        CreateProjection<RecipeImage, RecipeImageDto>();
        CreateProjection<Tag, TagDto>();
        CreateProjection<Recipe, RecipeDto>();
        CreateProjection<Recipe, RecipeListItemDto>()
            .ForMember(dest => dest.RecipeId,
                act => act.MapFrom(src => src.Id))
            .ForMember(dest => dest.ImageData,
                act => act.MapFrom(src => src.Image.ImageData));
    }
}