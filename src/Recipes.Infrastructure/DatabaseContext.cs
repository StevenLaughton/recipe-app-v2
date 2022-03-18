using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
    {
    }

    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
}