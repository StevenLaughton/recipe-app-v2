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

    private async Task<string> UploadStreamAsync(Stream content, string filename,
        CancellationToken cancellationToken)
    {
        var client = CreateBlobClient(_configuration.ConnectionString, _configuration.ContainerName);

        var blobClient = client.GetBlobClient(filename);

        await blobClient.UploadAsync(content, true, cancellationToken);

        return blobClient.Uri.AbsoluteUri;
    }

    public async Task<string> UploadFileToBlobAsync(IFormFile file, string filename,
        CancellationToken cancellationToken)
    {
        using var stream = new MemoryStream();
        await file.CopyToAsync(stream, cancellationToken);
        stream.Position = 0;
        return await UploadStreamAsync(stream, filename, cancellationToken);
    }

    public async Task<bool> DeleteBlobAsync(string filename, CancellationToken cancellationToken)
    {
        var client = CreateBlobClient(_configuration.ConnectionString, _configuration.ContainerName);
        var response = await client.DeleteBlobAsync(filename, cancellationToken: cancellationToken);
        return !response.IsError;
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