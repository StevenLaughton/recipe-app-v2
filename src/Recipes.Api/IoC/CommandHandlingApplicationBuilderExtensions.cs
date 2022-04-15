using System.Reflection;
using MediatR;
using Recipes.Api.IoC.PipelineBehaviours;
using Recipes.Core.Services;

namespace Recipes.Api.IoC;

public static class CommandHandlingApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddCommandHandling(this WebApplicationBuilder builder)
    {
        builder.Services.AddMediatR(typeof(GetFromImageUrlRequest), typeof(GetFromImageUrl));
        builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ApplicationInsightsBehaviour<,>));
        return builder;
    }
}