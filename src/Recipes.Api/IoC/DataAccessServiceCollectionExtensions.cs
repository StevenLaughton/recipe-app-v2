using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure;

namespace Recipes.Api.IoC;

internal static class DataAccessServiceCollectionExtensions
{
    internal static IServiceCollection AddDataAccess(this IServiceCollection serviceCollection,
        IConfiguration configuration)
    {
        serviceCollection.AddDbContext<DatabaseContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });
        return serviceCollection;
    }
}