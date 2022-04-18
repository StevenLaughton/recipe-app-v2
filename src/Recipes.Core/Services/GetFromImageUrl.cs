using MediatR;
using Recipes.Core.Extensions;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record GetFromImageUrlRequest(string Url) : IRequest<RecipeImage>;

public class GetFromImageUrl : IRequestHandler<GetFromImageUrlRequest, RecipeImage>
{
    private readonly IHttpClientFactory _httpClientFactory;

    public GetFromImageUrl(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<RecipeImage> Handle(GetFromImageUrlRequest request, CancellationToken cancellationToken)
    {
        var client = _httpClientFactory.CreateClient();

        var dataBytes = await client.GetByteArrayAsync(request.Url.DecodeUrl(), cancellationToken);

        if (!dataBytes.Any())
        {
            throw new Exception($"Not found");
        }

        var base64String = $"data:image/{request.Url.GetImageType()};base64,{Convert.ToBase64String(dataBytes)}";

        return new RecipeImage {ImageData = base64String};
    }
}