using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Enums;
using Recipes.Infrastructure.Models;

namespace Recipes.Core.Services;

public record GetRecipeListRequest(PaginationFilter Filter, Fare Fare) : IRequest<PaginatedList<RecipeListItemDto>>;

public class GetRecipeList : IRequestHandler<GetRecipeListRequest, PaginatedList<RecipeListItemDto>>
{
    private readonly DatabaseContext _context;

    public GetRecipeList(DatabaseContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<PaginatedList<RecipeListItemDto>> Handle(GetRecipeListRequest request,
        CancellationToken cancellationToken)
    {
        var query = _context.Recipes
            .AsSplitQuery()
            .Where(recipe => recipe.Fare == request.Fare)
            .OrderBy(recipe => recipe.Name)
            .Select(recipe => new RecipeListItemDto
            {
                RecipeId = recipe.Id,
                Name = recipe.Name,
                ImageUrl = recipe.ImageUrl
            });

        var page =  await PaginatedList<RecipeListItemDto>.CreateAsync(query,
            request.Filter.PageNumber,
            int.MaxValue,
            cancellationToken);

        return page;
    }
}