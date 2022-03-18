using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record GetRecipeRequest(int Id) : IRequest<Recipe?>;

public class GetRecipeHandler : IRequestHandler<GetRecipeRequest, Recipe?>
{
    private readonly DatabaseContext _context;

    public GetRecipeHandler(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<Recipe?> Handle(GetRecipeRequest request, CancellationToken cancellationToken)
    {
        return await _context.Recipes.FirstOrDefaultAsync(recipe => recipe!.Id == request.Id, cancellationToken);
    }
}