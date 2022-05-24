using MediatR;
using Recipes.Core.Extensions;
using Recipes.Infrastructure.Dtos;

namespace Recipes.Core.Services;

public record GetImageBlobFromUrlRequest(string Url) : IRequest<ImageDto>;

public class GetImageBlobFromUrl : IRequestHandler<GetImageBlobFromUrlRequest, ImageDto>
{
    private readonly IHttpClientFactory _httpClientFactory;

    public GetImageBlobFromUrl(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<ImageDto> Handle(GetImageBlobFromUrlRequest request, CancellationToken cancellationToken)
    {
        var client = _httpClientFactory.CreateClient();

        var dataBytes = await client.GetByteArrayAsync(request.Url.DecodeUrl(), cancellationToken);

        if (!dataBytes.Any())
        {
            throw new Exception($"Not found");
        }

        var filename = Guid.NewGuid() + "." + request.Url.GetImageType();
        return new ImageDto(dataBytes, filename);
    }
}