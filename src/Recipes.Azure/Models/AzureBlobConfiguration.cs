namespace Recipes.Azure.Models;

public class AzureBlobConfiguration
{
    public string ConnectionString { get; set; } = null!;
    public string ContainerName { get; set; } = null!;
}