using FluentValidation;
using Recipes.Core.Validators;

namespace Recipes.Api.IoC;

public static class ValidatorApplicationBuilderExtensions
{
    internal static WebApplicationBuilder AddModelValidation(this WebApplicationBuilder builder)
    {
        builder.Services.AddValidatorsFromAssemblyContaining<GetFromImageUrlRequestValidator>();

        return builder;
    }
}