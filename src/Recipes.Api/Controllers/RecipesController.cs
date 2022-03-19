using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    [ProducesResponseType(typeof(Recipe), (int) HttpStatusCode.OK)]
    public async Task<Recipe?> GetRecipe(int id)
    {
        var result = await _mediator.Send(new GetRecipeRequest(id));

        return result;
    }

    [HttpGet(nameof(GetRecipe2))]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetRecipe2()
    {
        return Ok(new TestDto("Pong"));
    }
}

public record TestDto(string Response);