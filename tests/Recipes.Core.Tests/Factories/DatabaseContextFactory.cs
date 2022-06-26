using System.Threading.Tasks;
using Recipes.Infrastructure;
using TestSupport.EfHelpers;

namespace Recipes.Core.Tests.Factories;

public static class DatabaseContextFactory
{
    public static DatabaseContext Create()
    {
        var options = SqliteInMemory.CreateOptions<DatabaseContext>();
        return new DatabaseContext(options);
    }

    public static void Initialise(this DatabaseContext context)
    {
        context.Database.EnsureCreated();
    }
}