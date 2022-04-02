using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
using Recipes.Core.Models;
using Recipes.Core.Services;
using Recipes.Infrastructure.Entities;

namespace Recipes.Api.Controllers;

[ApiController]
public class RecipesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RecipesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet(Routes.Default)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IList<RecipeListItemDto>))]
    public async Task<IActionResult> GetList(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRecipeListRequest(), cancellationToken);

        return Ok(result);
    }

    [HttpGet(Routes.WithId)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Recipe))]
    public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRecipeRequest(id), cancellationToken);

        return Ok(result);
    }
}