using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.ApplicationInsights.DependencyCollector;

namespace Recipes.Api.IoC;

public static class LoggingWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureLogging(this WebApplicationBuilder builder)
    {
        // builder.Services.AddLogging(log => log.AddApplicationInsights());
        var options = builder.Configuration.GetSection("ApplicationInsights").Get<ApplicationInsightsServiceOptions>();
        builder.Services.AddApplicationInsightsTelemetry(options);
        builder.Services.ConfigureTelemetryModule<DependencyTrackingTelemetryModule>((module, o) =>
        {
            module.EnableSqlCommandTextInstrumentation = true;
        });
        return builder;
    }
}