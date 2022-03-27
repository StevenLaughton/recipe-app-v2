
namespace Recipes.Infrastructure.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Title { get; set; }

    public ICollection<Recipe>? Recipes { get; set; }
}