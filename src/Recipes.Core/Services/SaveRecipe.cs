using AutoMapper;
using MediatR;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record SaveRecipeRequest(RecipeDto Recipe) : IRequest<int>;

public class SaveRecipe : IRequestHandler<SaveRecipeRequest, int>
{
    private readonly DatabaseContext _context;
    private readonly IMapper _mapper;

    public SaveRecipe(DatabaseContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> Handle(SaveRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<RecipeDto, Recipe>(request.Recipe);
        
        if (request.Recipe.Image is not null)
        {
            var image = _mapper.Map<RecipeImageDto, RecipeImage>(request.Recipe.Image);
            entity.Image = image;
        }
        
        await _context.Recipes.AddAsync(entity, cancellationToken);
        var saved = await _context.SaveChangesAsync(cancellationToken);
        
        return saved;
    }
}