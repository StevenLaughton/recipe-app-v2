using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Recipes.Infrastructure.Entities;

namespace Recipes.Infrastructure.Configurations;

public class TagConfiguration : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("Tags").HasKey(t => t.Id);

        builder.Property(tag => tag.Title)
            .HasMaxLength(124);
    }
}