using System.Text.Json;
using System.Text.Json.Serialization;

namespace Recipes.Api.IoC;

public static class ControllerWebApplicationExtensions
{
    public static WebApplicationBuilder ConfigureControllers(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });
        return builder;
    }

    public static WebApplication UseControllers(this WebApplication application)
    {
        application.MapControllers();
        application.MapGet("/", async context => { await context.Response.WriteAsync("Pong"); });

        return application;
    }
}