using Microsoft.AspNetCore.Http;

namespace Recipes.Azure.Implementations;

public interface IAzureBlobService
{
    public Task<string> UploadFileToBlobAsync(IFormFile file, string filename, CancellationToken cancellationToken);

    public Task<bool> DeleteBlobAsync(string filename, CancellationToken cancellationToken);
}