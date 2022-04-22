using Microsoft.AspNetCore.Cors.Infrastructure;
using Recipes.Api.Constants;

namespace Recipes.Api.IoC;

public static class CorsWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(ApplicationUiPolicy);
        return builder;
    }

    private static void ApplicationUiPolicy(CorsOptions options)
    {
        options.AddPolicy(name: CorsPolicies.ApplicationUiPolicy, builder => builder
            .AllowAnyOrigin()
            .WithMethods(HttpMethods.Get, HttpMethods.Post, HttpMethods.Put, HttpMethods.Options, HttpMethods.Delete)
            .AllowAnyHeader()
        );
    }
}