using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Core;
using Recipes.Core.Services;
using Recipes.Infrastructure.Entities;

namespace Recipes.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RecipesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(nameof(GetRecipe))]
    public async Task<Recipe?> GetRecipe(int id)
    {
        GetRecipeRequest request = new(id);
        var result = await _mediator.Send(request);

        return result;
    }
}