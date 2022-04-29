using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
using Recipes.Core.Services;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;

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
    public async Task<IActionResult> GetList([FromQuery] Fare fare, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRecipeListRequest(fare), cancellationToken);

        return Ok(result);
    }

    [HttpGet(Routes.Id)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Recipe))]
    public async Task<IActionResult> Get(int id,[FromQuery] bool includeImage, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRecipeRequest(id, includeImage), cancellationToken);

        return Ok(result);
    }

    [HttpPost(Routes.Default)]
    public async Task<IActionResult> Save([FromBody] RecipeDto recipe, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new SaveRecipeRequest(recipe), cancellationToken);

        return Ok(result);
    }
    
    [HttpPut(Routes.Default)]
    public async Task<IActionResult> Update([FromBody] RecipeDto recipe, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new UpdateRecipeRequest(recipe), cancellationToken);

        return Ok(result);
    }

    [HttpDelete(Routes.Id)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteRecipeRequest(id), cancellationToken);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
    }
}