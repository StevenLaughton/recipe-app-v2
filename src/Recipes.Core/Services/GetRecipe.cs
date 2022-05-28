using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;

namespace Recipes.Core.Services;

public record GetRecipeRequest(int Id): IRequest<RecipeDto>;

public class GetRecipeHandler : IRequestHandler<GetRecipeRequest, RecipeDto>
{
    private readonly DatabaseContext _context;
    private readonly IConfigurationProvider _configurationProvider;

    public GetRecipeHandler(DatabaseContext context, IMapper mapper)
    {
        _context = context  ?? throw new ArgumentNullException(nameof(context));
        _configurationProvider = mapper.ConfigurationProvider  ?? throw new ArgumentNullException(nameof(mapper));
    }

    public async Task<RecipeDto> Handle(GetRecipeRequest request, CancellationToken cancellationToken)
    {
        var dto = await _context.Recipes
            .AsSplitQuery()
            .AsNoTracking()
            .ProjectTo<RecipeDto>(_configurationProvider)
            .FirstOrDefaultAsync(recipe => recipe.Id == request.Id, cancellationToken);

        if (dto is null)
        {
            throw new ArgumentNullException($"Recipe not found with id {request.Id}");
        }

        return dto;
    }
}