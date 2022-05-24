using Microsoft.AspNetCore.Http;

namespace Recipes.Azure.Implementations;

public interface IAzureBlobService
{
    public Task<string> UploadBlobAsync(IFormFile content, string filename, CancellationToken cancellationToken);

    public Task DeleteBlobAsync(string filename, CancellationToken cancellationToken);
}