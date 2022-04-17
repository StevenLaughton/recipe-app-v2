using Recipes.Infrastructure.Profiles;

namespace Recipes.Api.IoC;

public static class AutoMapperApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddAutoMapper(this WebApplicationBuilder builder)
    {
        builder.Services.AddAutoMapper(typeof(EntityToDtoProfile), typeof(DtoToEntityProfile));

        return builder;
    }
}