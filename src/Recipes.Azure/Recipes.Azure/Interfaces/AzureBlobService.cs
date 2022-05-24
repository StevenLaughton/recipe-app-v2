using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Recipes.Azure.Implementations;
using Recipes.Azure.Models;

namespace Recipes.Azure.Interfaces;

public class AzureBlobService : IAzureBlobService
{
    private readonly AzureBlobConfiguration _configuration;
    
    public AzureBlobService(IOptions<AzureBlobConfiguration> configuration)
    {
        _configuration = configuration.Value;
    }

    public async Task<string> UploadBlobAsync(IFormFile content, string filename,
        CancellationToken cancellationToken)
    {
        var client = CreateBlobClient(_configuration.ConnectionString, _configuration.ContainerName);

        var blobClient = client.GetBlobClient(filename);

        using var stream = new MemoryStream();
        await content.CopyToAsync(stream, cancellationToken);
        stream.Position = 0;
        await blobClient.UploadAsync(stream, true, cancellationToken);

        return blobClient.Uri.AbsoluteUri;
    }

    public async Task DeleteBlobAsync(string filename, CancellationToken cancellationToken)
    {
        var client = CreateBlobClient(_configuration.ConnectionString, _configuration.ContainerName);
        await client.DeleteBlobAsync(filename, cancellationToken: cancellationToken);
    }

    private static BlobContainerClient CreateBlobClient(string connectionString, string containerName)
    {
        // Create a BlobServiceClient object which will be used to create a container client
        var blobServiceClient = new BlobServiceClient(connectionString);

        // Create the container and return a container client object
        var containerClient = blobServiceClient.GetBlobContainerClient(containerName);

        return containerClient;
    }
}