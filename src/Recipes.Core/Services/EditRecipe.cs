using AutoMapper;
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
    private readonly IMapper _mapper;
    private readonly IAzureBlobService _azureBlobService;

    public EditRecipe(DatabaseContext context, IMapper mapper, IAzureBlobService azureBlobService)
    {
        _context = context;
        _mapper = mapper;
        _azureBlobService = azureBlobService;
    }

    public async Task<bool> Handle(EditRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = await _context.GetRecipeById(request.Recipe.Id);

        var existingImage = entity.ImageUrl.GetFilenameFromUrl();
        
        entity = _mapper.Map(request.Recipe, entity);

        if (request.Recipe.Image is not null)
        {
            using var stream = new MemoryStream();
            await request.Recipe.Image.CopyToAsync(stream, cancellationToken);
            stream.Position = 0;
            var imageUrl = await _azureBlobService.UploadBlobAsync(stream, existingImage ?? request.Recipe.Image.FileName, cancellationToken);
            entity.ImageUrl = imageUrl;
        }

        entity.Tags = new List<Tag>();

        _context.Recipes.Update(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}