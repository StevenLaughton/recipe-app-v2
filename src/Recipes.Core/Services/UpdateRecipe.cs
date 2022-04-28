using AutoMapper;
using MediatR;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Queries;

namespace Recipes.Core.Services;

public record UpdateRecipeRequest(RecipeDto RecipeDto) : IRequest<bool>;

public class UpdateRecipe : IRequestHandler<UpdateRecipeRequest, bool>
{
    private readonly DatabaseContext _context;
    private readonly IMapper _mapper;

    public UpdateRecipe(DatabaseContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> Handle(UpdateRecipeRequest request, CancellationToken cancellationToken)
    {
        var entity = await _context.GetRecipeById(request.RecipeDto.Id);

        entity = _mapper.Map(request.RecipeDto, entity);

        if (request.RecipeDto.Image is not null)
        {
            var image = _mapper.Map<RecipeImageDto, RecipeImage>(request.RecipeDto.Image);
            entity.Image = image;
        }
        
        entity.Tags = new List<Tag>();
        
        _context.Recipes.Update(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}