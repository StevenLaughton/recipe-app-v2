using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Recipes.Azure.Models;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Enums;

namespace Recipes.Core.Services;

public record GetRecipeListRequest(Fare Fare) : IRequest<IList<RecipeListItemDto>>;

public class GetRecipeList : IRequestHandler<GetRecipeListRequest, IList<RecipeListItemDto>>
{
    private readonly DatabaseContext _context;
    private readonly IConfigurationProvider _configurationProvider;
    private readonly ILogger<GetRecipeList> _logger;
    private readonly AzureBlobConfiguration _azureBlobConfiguration;

    public GetRecipeList(DatabaseContext context, IMapper mapper, ILogger<GetRecipeList> logger,
        IOptions<AzureBlobConfiguration> azureBlob)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _configurationProvider = mapper.ConfigurationProvider ?? throw new ArgumentNullException(nameof(mapper));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _azureBlobConfiguration = azureBlob.Value ?? throw new ArgumentNullException(nameof(azureBlob));
    }

    public async Task<IList<RecipeListItemDto>> Handle(GetRecipeListRequest request,
        CancellationToken cancellationToken)
    {
        _logger.LogInformation(_azureBlobConfiguration.ContainerName);
        _logger.LogTrace(_azureBlobConfiguration.ContainerName);
        _logger.LogDebug(_azureBlobConfiguration.ContainerName);
        _logger.LogWarning(_azureBlobConfiguration.ContainerName);
        _logger.LogError(_azureBlobConfiguration.ContainerName);
        _logger.LogCritical(_azureBlobConfiguration.ContainerName);
        var recipeListItems = await _context.Recipes
            .AsSplitQuery()
            .Where(recipe => recipe.Fare == request.Fare)
            .OrderBy(recipe => recipe.Name)
            .Select(recipe => new RecipeListItemDto
            {
                RecipeId = recipe.Id,
                Name = recipe.Name,
                ImageUrl = recipe.ImageUrl
            })
            .ToListAsync(cancellationToken);

        return recipeListItems;
    }
}