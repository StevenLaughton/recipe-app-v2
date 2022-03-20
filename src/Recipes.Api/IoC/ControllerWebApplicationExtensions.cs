namespace Recipes.Api.IoC;

public static class ControllerWebApplicationExtensions
{
    public static WebApplicationBuilder ConfigureControllers(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        return builder;
    }

    public static WebApplication UseControllers(this WebApplication application)
    {
        application.MapControllers();
        application.MapGet("/", async context => { await context.Response.WriteAsync("Pong"); });

        return application;
    }
}