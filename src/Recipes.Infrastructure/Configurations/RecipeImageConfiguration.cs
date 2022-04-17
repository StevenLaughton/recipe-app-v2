using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Configurations;

public class RecipeImageConfiguration : IEntityTypeConfiguration<RecipeImage>
{
    public void Configure(EntityTypeBuilder<RecipeImage> builder)
    {
        builder.ToTable("Images");

        builder.HasOne(recipeImage => recipeImage.Recipe)
            .WithOne(recipe => recipe.Image)
            .HasForeignKey<RecipeImage>(recipeImage => recipeImage.RecipeId);
    }
}