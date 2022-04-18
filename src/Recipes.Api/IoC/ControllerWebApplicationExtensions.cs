using System.Text.Json;
using System.Text.Json.Serialization;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Recipes.Core.Validators;

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
            })
            .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = c =>
                    {
                        var errors =  c.ModelState.Values.Where(v => v.Errors.Count > 0)
                            .SelectMany(v => v.Errors)
                            .Select(v => v.ErrorMessage);

                        return new BadRequestObjectResult(new 
                        {
                            Message = "Model is invalid",
                            Errors = errors
                        });
                    };
                })
                .AddFluentValidation(options =>
                options.RegisterValidatorsFromAssemblyContaining<GetFromImageUrlRequestValidator>());

        return builder;
    }

    public static WebApplication UseControllers(this WebApplication application)
    {
        application.MapControllers();
        application.MapGet("/", async context => { await context.Response.WriteAsync("Pong"); });

        return application;
    }
}