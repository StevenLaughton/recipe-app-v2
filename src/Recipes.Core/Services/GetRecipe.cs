using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record GetRecipeRequest(int Id) : IRequest<RecipeDto>;

public class GetRecipeHandler : IRequestHandler<GetRecipeRequest, RecipeDto>
{
    private readonly DatabaseContext _context;

    public GetRecipeHandler(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<RecipeDto> Handle(GetRecipeRequest request, CancellationToken cancellationToken)
    {
        var dto = await _context.Recipes
            .AsSplitQuery()
            .AsNoTracking()
            .Select(recipe => new RecipeDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Portions = recipe.Portions,
                IsVegetarian = recipe.IsVegetarian,
                Fare = recipe.Fare,
                Ingredients = recipe.Ingredients.Select(i => new IngredientDto
                {
                    Id = i.Id,
                    Quantity = i.Quantity,
                    Text = i.Text,
                    IsGroupHeader = i.IsGroupHeader
                }),
                Steps = recipe.Steps.Select(s => new StepDto
                {
                    Id = s.Id,
                    Text = s.Text,
                    IsGroupHeader = s.IsGroupHeader
                }),
                Tags = recipe.Tags.Select(tag => new TagDto
                {
                    Id = tag.Id,
                    Title = tag.Title
                })
            })
            .FirstOrDefaultAsync(recipe => recipe.Id == request.Id, cancellationToken);

        if (dto is null)
        {
            throw new ArgumentNullException($"Recipe not found with id {request.Id}");
        }

        return dto;
    }
}