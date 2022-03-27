using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Core.Models;
using Recipes.Infrastructure;

namespace Recipes.Core.Services;

public record GetRecipeListRequest : IRequest<IList<RecipeListItemDto>>;

public class GetRecipeList : IRequestHandler<GetRecipeListRequest, IList<RecipeListItemDto>>
{
    private readonly DatabaseContext _context;

    public GetRecipeList(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IList<RecipeListItemDto>> Handle(GetRecipeListRequest request,
        CancellationToken cancellationToken)
    {
        var recipes = await _context.Recipes
            .Select(recipe => RecipeListItemDto.MapFromRecipe(recipe))
            .ToListAsync(cancellationToken);

        return recipes;
    }
}