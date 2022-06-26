using MediatR;
using Recipes.Azure.Implementations;
using Recipes.Core.Extensions;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Queries;

namespace Recipes.Core.Services;

public record EditRecipeRequest(RecipeDto Recipe) : IRequest<bool>;

public class EditRecipe : IRequestHandler<EditRecipeRequest, bool>
{
    private readonly DatabaseContext _context;
    private readonly IAzureBlobService _azureBlobService;

    public EditRecipe(DatabaseContext context, IAzureBlobService azureBlobService)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _azureBlobService = azureBlobService ?? throw new ArgumentNullException(nameof(azureBlobService));
    }

    public async Task<bool> Handle(EditRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = await _context.GetRecipeById(request.Recipe.Id);

        if (request.Recipe.Image is not null)
        {
            var filename = entity.ImageUrl.GetFilenameFromUrl() ?? request.Recipe.Image.FileName;
            entity.ImageUrl =
                await _azureBlobService.UploadFileToBlobAsync(request.Recipe.Image, filename, cancellationToken);
        }

        entity = request.Recipe.MapToEntity(entity);
        
        entity.Tags = new List<Tag>();

        _context.Recipes.Update(entity);

        var edited = await _context.SaveChangesAsync(cancellationToken);

        return edited == 1;
    }
}