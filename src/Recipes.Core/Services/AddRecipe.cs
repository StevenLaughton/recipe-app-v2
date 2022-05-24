using AutoMapper;
using MediatR;
using Recipes.Azure.Implementations;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record AddRecipeRequest(RecipeDto Recipe) : IRequest<int>;

public class AddRecipe : IRequestHandler<AddRecipeRequest, int>
{
    private readonly DatabaseContext _context;
    private readonly IMapper _mapper;
    private readonly IAzureBlobService _azureBlobService;

    public AddRecipe(DatabaseContext context, IMapper mapper, IAzureBlobService azureBlobService)
    {
        _context = context;
        _mapper = mapper;
        _azureBlobService = azureBlobService;
    }

    public async Task<int> Handle(AddRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<RecipeDto, Recipe>(request.Recipe);

        if (request.Recipe.Image is not null)
        {
            var imageUrl = await _azureBlobService.UploadBlobAsync(request.Recipe.Image, request.Recipe.Image.FileName, cancellationToken);
            entity.ImageUrl = imageUrl;
        }
        
        await _context.Recipes.AddAsync(entity, cancellationToken);
        var saved = await _context.SaveChangesAsync(cancellationToken);

        return saved;
    }
}