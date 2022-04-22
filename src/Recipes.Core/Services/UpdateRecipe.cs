using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;

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
        var entity = await _context.Recipes
            .Include(recipe => recipe.Image)
            .Include(recipe => recipe.Ingredients)
            .Include(recipe => recipe.Steps)
            .FirstAsync(recipe => recipe.Id == request.RecipeDto.Id, cancellationToken);

        entity = _mapper.Map(request.RecipeDto, entity);

        entity.Tags = new List<Tag>();
        
        _context.Recipes.Update(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}