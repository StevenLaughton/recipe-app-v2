namespace Recipes.Infrastructure.Entities;

public class RecipeImage
{
    public int Id { get; set; }

    public byte[]? ImageData { get; set; }

    public int RecipeId { get; set; }
    public virtual Recipe Recipe { get; set; }
}