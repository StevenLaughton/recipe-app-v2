using System.Reflection;
using MediatR;
using Recipes.Api.IoC.PipelineBehaviours;

namespace Recipes.Api.IoC;

public static class CommandHandlingApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddCommandHandling(this WebApplicationBuilder builder)
    {
        builder.Services.AddMediatR(Assembly.GetExecutingAssembly());
        builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ApplicationInsightsBehaviour<,>));
        return builder;
    }
}