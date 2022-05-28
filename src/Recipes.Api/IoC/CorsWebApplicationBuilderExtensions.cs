using Microsoft.AspNetCore.Cors.Infrastructure;
using Recipes.Api.Constants;

namespace Recipes.Api.IoC;

public static class CorsWebApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(o => ApplicationUiPolicy(o, builder));
        return builder;
    }

    private static void ApplicationUiPolicy(CorsOptions options, WebApplicationBuilder webApplicationBuilder)
    {
        options.AddPolicy(name: CorsPolicies.ApplicationUiPolicy, builder => builder
            .WithOrigins(webApplicationBuilder.Configuration.GetValue<string>("AllowedOrigin"))
            .WithMethods(HttpMethods.Get, HttpMethods.Post, HttpMethods.Put, HttpMethods.Options, HttpMethods.Delete)
            .AllowAnyHeader()
            .WithExposedHeaders("Content-Disposition")
        );
    }
}