using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Recipes.Azure.Models;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Enums;

namespace Recipes.Core.Services;

public record GetRecipeListRequest(Fare Fare) : IRequest<IList<RecipeListItemDto>>;

public class GetRecipeList : IRequestHandler<GetRecipeListRequest, IList<RecipeListItemDto>>
{
    private readonly DatabaseContext _context;

    public GetRecipeList(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<IList<RecipeListItemDto>> Handle(GetRecipeListRequest request,
        CancellationToken cancellationToken)
    {
        var recipeListItems = await _context.Recipes
            .AsSplitQuery()
            .Where(recipe => recipe.Fare == request.Fare)
            .OrderBy(recipe => recipe.Name)
            .Select(recipe => new RecipeListItemDto
            {
                RecipeId = recipe.Id,
                Name = recipe.Name,
                ImageUrl = recipe.ImageUrl
            })
            .ToListAsync(cancellationToken);

        return recipeListItems;
    }
}