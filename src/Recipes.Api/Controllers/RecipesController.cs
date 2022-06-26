using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
using Recipes.Core.Services;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;
using Recipes.Infrastructure.Models;

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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedList<RecipeListItemDto>))]
    public async Task<IActionResult> GetList([FromQuery] PaginationFilter filter, [FromQuery] Fare fare,
        CancellationToken cancellationToken)
    {
        var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);

        var result = await _mediator.Send(new GetRecipeListRequest(validFilter, fare), cancellationToken);

        return Ok(result);
    }

    [HttpGet(Routes.Id)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Recipe))]
    public async Task<IActionResult> Get(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetRecipeRequest(id), cancellationToken);

        return Ok(result);
    }

    [HttpPost(Routes.Default)]
    public async Task<IActionResult> Add([FromForm] RecipeDto recipe, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new AddRecipeRequest(recipe), cancellationToken);

        return Ok(result);
    }

    [HttpPut(Routes.Default)]
    public async Task<IActionResult> Edit([FromForm] RecipeDto recipe, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new EditRecipeRequest(recipe), cancellationToken);

        if (result)
        {
            return Ok();
        }

        return BadRequest();
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