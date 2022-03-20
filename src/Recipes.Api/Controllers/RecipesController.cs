using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Recipe))]
    public async Task<IActionResult> GetRecipe(int id)
    {
        var result = await _mediator.Send(new GetRecipeRequest(id));

        return Ok(result);
    }

    [HttpGet(Routes.Default)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetRecipe2()
    {
        return Ok(new TestDto("Pong"));
    }
}

public record TestDto(string Response);