using MediatR;
using Recipes.Azure.Implementations;
using Recipes.Core.Extensions;
using Recipes.Infrastructure;

namespace Recipes.Core.Services;

public record DeleteRecipeRequest(int Id) : IRequest<bool>;

public class DeleteRecipe : IRequestHandler<DeleteRecipeRequest, bool>
{
    private readonly DatabaseContext _context;
    private readonly IAzureBlobService _azureBlobService;

    public DeleteRecipe(DatabaseContext context, IAzureBlobService azureBlobService)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _azureBlobService = azureBlobService ?? throw new ArgumentNullException(nameof(azureBlobService));
    }

    public async Task<bool> Handle(DeleteRecipeRequest request, CancellationToken cancellationToken)
    {
        var recipe = await _context.Recipes.FindAsync(new object?[] {request.Id}, cancellationToken);

        if (recipe is null)
        {
            return false;
        }

        var filename = recipe.ImageUrl?.GetFilenameFromUrl();
        if (filename != null)
        {
            await _azureBlobService.DeleteBlobAsync(filename, cancellationToken);
        }

        _context.Recipes.Remove(recipe);
        var removedEntities = await _context.SaveChangesAsync(cancellationToken);

        return removedEntities > 0;
    }
}