using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;

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
                Fare = recipe.Fare,
                IsVegetarian = recipe.IsVegetarian,
                Portions = recipe.Portions,
                ImageUrl = recipe.ImageUrl,
                Ingredients = recipe.Ingredients.Select(ingredient => new IngredientDto
                {
                    Id = ingredient.Id,
                    Text = ingredient.Text,
                    Quantity = ingredient.Quantity,
                    IsGroupHeader = ingredient.IsGroupHeader
                }),
                Steps = recipe.Steps.Select(step => new StepDto
                {
                    Id = step.Id,
                    IsGroupHeader = step.IsGroupHeader,
                    Text = step.Text
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