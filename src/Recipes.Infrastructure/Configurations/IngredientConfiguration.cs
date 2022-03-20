using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Configurations;

public class IngredientConfiguration : IEntityTypeConfiguration<Ingredient>
{
    public void Configure(EntityTypeBuilder<Ingredient> builder)
    {
        builder.ToTable("Ingredients").HasKey(i => i.Id);

        builder.Property(ingredient => ingredient.Name)
            .HasMaxLength(256);

        builder.Property(ingredient => ingredient.Quantity)
            .HasPrecision(5);
    }
}