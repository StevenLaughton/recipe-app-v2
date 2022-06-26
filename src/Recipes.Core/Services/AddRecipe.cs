using MediatR;
using Recipes.Azure.Implementations;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record AddRecipeRequest(RecipeDto Recipe) : IRequest<bool>;

public class AddRecipe : IRequestHandler<AddRecipeRequest, bool>
{
    private readonly DatabaseContext _context;
    private readonly IAzureBlobService _azureBlobService;

    public AddRecipe(DatabaseContext context, IAzureBlobService azureBlobService)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _azureBlobService = azureBlobService ?? throw new ArgumentNullException(nameof(azureBlobService));
    }

    public async Task<bool> Handle(AddRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = request.Recipe.MapToEntity(new Recipe());

        if (request.Recipe.Image is not null)
        {
            entity.ImageUrl = await _azureBlobService.UploadFileToBlobAsync(request.Recipe.Image,
                request.Recipe.Image.FileName, cancellationToken);
        }

        await _context.Recipes.AddAsync(entity, cancellationToken);
        var saved = await _context.SaveChangesAsync(cancellationToken);

        return saved == 1;
    }
}