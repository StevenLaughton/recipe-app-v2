using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;

namespace Recipes.Api.IoC;

internal static class DataAccessWebApplicationBuilderExtensions
{
    internal static WebApplicationBuilder AddDataAccess(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<DatabaseContext>(options =>
        {
            //  dotnet ef migrations add <name> --project Recipes.Infrastructure
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DatabaseContext"),
                sqlServerOptionsAction => sqlServerOptionsAction.MigrationsAssembly("Recipes.Infrastructure")
            );
        });

        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();
        }

        return builder;
    }
}