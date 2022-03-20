using MediatR;
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;

namespace Recipes.Api.IoC.PipelineBehaviours;

public class ApplicationInsightsBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly TelemetryClient _telemetryClient;

    public ApplicationInsightsBehaviour(TelemetryClient telemetryClient)
    {
        _telemetryClient = telemetryClient;
    }

    public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken,
        RequestHandlerDelegate<TResponse> next)
    {
        var commandName = typeof(TRequest).Name;

        using var operation = _telemetryClient.StartOperation<DependencyTelemetry>(commandName);
        TResponse response;
        try
        {
            response = await next().ConfigureAwait(false);
            operation.Telemetry.Success = true;
        }
        catch (Exception e)
        {
            operation.Telemetry.Success = false;
            _telemetryClient.TrackException(e);

            throw;
        }

        return response;
    }
}