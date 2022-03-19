using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;

namespace Recipes.Api.IoC;

internal static class DataAccessWebApplicationBuilderExtensions
{
    internal static WebApplicationBuilder AddDataAccess(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<DatabaseContext>(options =>
        {
            options.UseSqlServer(builder
                .Configuration.GetConnectionString("DatabaseContext"));
        });

        if (builder.Environment.IsDevelopment())
        {
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();
        }
        
        return builder;
    }
}