using AutoMapper;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Profiles;

public class DtoToEntityProfile : Profile
{
    public DtoToEntityProfile()
    {
        CreateMap<IngredientDto, Ingredient>();
        CreateMap<StepDto, Step>();
        CreateMap<TagDto, Tag>();
        CreateMap<RecipeDto, Recipe>()
            .ForMember(c => c.Ingredients, o => o.MapFrom(s => s.Ingredients))
            .ForMember(c => c.Steps, o => o.MapFrom(s => s.Steps));
    }
}