using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Configurations;

public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes").HasKey(r => r.Id);

        builder.Property(recipe => recipe.Name)
            .HasMaxLength(256);

        builder.HasOne(recipe => recipe.Image)
            .WithOne(image => image.Recipe)
            .HasForeignKey<RecipeImage>(image => image.RecipeId);

        builder.HasMany(recipe => recipe.Ingredients)
            .WithOne(ingredient => ingredient.Recipe)
            .HasForeignKey(ingredient => ingredient.RecipeId);

        builder.HasMany(recipe => recipe.Tags)
            .WithMany(tag => tag.Recipes);
    }
}