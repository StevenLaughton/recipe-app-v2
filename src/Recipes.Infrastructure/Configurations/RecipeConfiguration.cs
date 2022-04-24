using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;

namespace Recipes.Infrastructure.Configurations;

public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.ToTable("Recipes").HasKey(r => r.Id);

        builder.Property(recipe => recipe.Name)
            .HasMaxLength(256);

        builder.Property(recipe => recipe.Fare).HasDefaultValue(Fare.Food);

        builder.HasOne(recipe => recipe.Image)
            .WithOne(image => image.Recipe)
            .HasForeignKey<RecipeImage>(image => image.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(recipe => recipe.Ingredients)
            .WithOne(ingredient => ingredient.Recipe)
            .HasForeignKey(ingredient => ingredient.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(recipe => recipe.Steps)
            .WithOne(step => step.Recipe)
            .HasForeignKey(step => step.RecipeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(recipe => recipe.Tags)
            .WithMany(tag => tag.Recipes);

        builder.HasIndex(recipe => recipe.Fare);
    }
}