using System.Text.Json;
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
        var telemetry = new DependencyTelemetry
        {
            Name = typeof(TRequest).Name,
            Data = JsonSerializer.Serialize(request),
            Type = "Command"
        };

        using var operation = _telemetryClient.StartOperation(telemetry);
        TResponse response;
        try
        {
            response = await next().ConfigureAwait(false);
            operation.Telemetry.Success = true;
        }
        catch (Exception)
        {
            operation.Telemetry.Success = false;

            throw;
        }
        finally
        {
            _telemetryClient.StopOperation(operation);
        }

        return response;
    }
}