using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
using Recipes.Core.Services;
using Recipes.Infrastructure.Entities;

namespace Recipes.Api.Controllers;

[ApiController]
[Route(Routes.Default)]
public class ImagesController: ControllerBase
{
    private readonly IMediator _mediator;

    public ImagesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{url}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RecipeImage))]
    public async Task<IActionResult> GetBase64String(string url, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetFromImageUrlRequest(url), cancellationToken);
        return Ok(result);
    }
}