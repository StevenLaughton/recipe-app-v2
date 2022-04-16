using MediatR;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using Recipes.Core.Extensions;
using Recipes.Infrastructure.Entities;

namespace Recipes.Core.Services;

public record GetFromImageUrlRequest(string Url) : IRequest<RecipeImage>;

public class GetFromImageUrl : IRequestHandler<GetFromImageUrlRequest, RecipeImage>
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly TelemetryClient _telemetryClient;

    public GetFromImageUrl(IHttpClientFactory httpClientFactory, TelemetryClient telemetryClient)
    {
        _httpClientFactory = httpClientFactory;
        _telemetryClient = telemetryClient;
    }

    public async Task<RecipeImage> Handle(GetFromImageUrlRequest request, CancellationToken cancellationToken)
    {
        _telemetryClient.TrackTrace($"Encoded Url: {request.Url}", SeverityLevel.Information);
        _telemetryClient.TrackTrace($"Decoded Url: {request.Url.DecodeUrl()}", SeverityLevel.Information);
        var client = _httpClientFactory.CreateClient();
        
        var dataBytes = await client.GetByteArrayAsync(request.Url.DecodeUrl(), cancellationToken);

        if (!dataBytes.Any())
        {
            throw new Exception($"Not found");
        }

        var base64String = $"data:image/{request.Url.GetImageType()};base64,{Convert.ToBase64String(dataBytes)}";

        return new RecipeImage{ ImageData = base64String};
    }
}