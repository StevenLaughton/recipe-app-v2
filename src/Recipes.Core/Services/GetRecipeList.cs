using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;

namespace Recipes.Core.Services;

public record GetRecipeListRequest : IRequest<IList<RecipeListItemDto>>;

public class GetRecipeList : IRequestHandler<GetRecipeListRequest, IList<RecipeListItemDto>>
{
    private readonly DatabaseContext _context;
    private readonly IConfigurationProvider _configurationProvider;

    public GetRecipeList(DatabaseContext context, IMapper mapper)
    {
        _context = context;
        _configurationProvider = mapper.ConfigurationProvider;
    }

    public async Task<IList<RecipeListItemDto>> Handle(GetRecipeListRequest request,
        CancellationToken cancellationToken)
    {
        var recipeListItemDtos = await _context.Recipes
            .AsSplitQuery()
            .ProjectTo<RecipeListItemDto>(_configurationProvider)
            .ToListAsync(cancellationToken);

        return recipeListItemDtos;
    }
}