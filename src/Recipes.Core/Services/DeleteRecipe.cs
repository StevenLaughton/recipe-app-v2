using MediatR;
using Recipes.Infrastructure;

namespace Recipes.Core.Services;

public record DeleteRecipeRequest(int Id) : IRequest<bool>;

public class DeleteRecipe : IRequestHandler<DeleteRecipeRequest, bool>
{
    private readonly DatabaseContext _context;

    public DeleteRecipe(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteRecipeRequest request, CancellationToken cancellationToken)
    {
        var recipe = await _context.Recipes.FindAsync(new object?[] {request.Id}, cancellationToken);

        if (recipe is null)
        {
            return false;
        }

        _context.Recipes.Remove(recipe);
        var removedEntities = await _context.SaveChangesAsync(cancellationToken);

        return removedEntities > 0;
    }
}