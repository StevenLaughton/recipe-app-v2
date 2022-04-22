using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Configurations;

public class StepConfiguration : IEntityTypeConfiguration<Step>
{
    public void Configure(EntityTypeBuilder<Step> builder)
    {
        builder.ToTable("Steps");

        builder.Property(step => step.Text)
            .HasMaxLength(512);
    }
}