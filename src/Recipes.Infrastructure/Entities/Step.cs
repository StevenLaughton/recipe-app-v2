namespace Recipes.Infrastructure.Entities;

public class Step
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public bool IsGroupHeader { get; set; }

    public int RecipeId { get; set; }
    public virtual Recipe Recipe { get; set; } = null!;
}