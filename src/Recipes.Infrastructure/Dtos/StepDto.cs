namespace Recipes.Infrastructure.Dtos;

public class StepDto
{
    public int Id { get; set; }
    public string Text { get; set; } = null!;
    public bool IsGroupHeader { get; set; }
}