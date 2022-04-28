using Microsoft.EntityFrameworkCore;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Queries;

public static class RecipeQueries
{
    public static Task<Recipe> GetRecipeById(this DatabaseContext context, int id)
    {
        return _getRecipeById.Invoke(context, id);
    }

    private static readonly Func<DatabaseContext, int, Task<Recipe>> _getRecipeById =
        EF.CompileAsyncQuery((DatabaseContext ctx, int id) =>
            ctx.Recipes.AsSplitQuery()
                .AsTracking()
                .Include(recipe => recipe.Image)
                .Include(recipe => recipe.Ingredients)
                .Include(recipe => recipe.Steps)
                .First(recipe => recipe.Id == id));
}