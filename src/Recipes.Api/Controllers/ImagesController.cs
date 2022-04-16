using MediatR;
using Microsoft.AspNetCore.Mvc;
using Recipes.Api.Constants;
using Recipes.Core.Services;
using Recipes.Infrastructure.Entities;

namespace Recipes.Api.Controllers;

[ApiController]
public class ImagesController: ControllerBase
{
    private readonly IMediator _mediator;

    public ImagesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost(Routes.Default)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RecipeImage))]
    public async Task<IActionResult> GetBase64String([FromBody] GetFromImageUrlRequest request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(request, cancellationToken);
        return Ok(result);
    }
}