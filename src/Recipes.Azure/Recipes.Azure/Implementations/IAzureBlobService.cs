namespace Recipes.Azure.Implementations;

public interface IAzureBlobService
{
    public Task<string> UploadBlobAsync(Stream content, string filename, CancellationToken cancellationToken);

    public Task DeleteBlobAsync(string filename, CancellationToken cancellationToken);
}