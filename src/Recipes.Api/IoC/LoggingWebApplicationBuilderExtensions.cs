namespace Recipes.Api.IoC;

public static class LoggingWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder ConfigureLogging(this WebApplicationBuilder builder)
    {
        builder.Services.AddLogging();
        builder.Services.AddApplicationInsightsTelemetry();
        return builder;
    }
}