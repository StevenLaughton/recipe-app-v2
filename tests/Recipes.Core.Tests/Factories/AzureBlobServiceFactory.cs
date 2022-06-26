using System.Threading;
using Microsoft.AspNetCore.Http;
using Moq;
using Recipes.Azure.Implementations;

namespace Recipes.Core.Tests.Factories;

public class AzureBlobServiceFactory
{
    private readonly Mock<IAzureBlobService> _azureBlobService;

    public AzureBlobServiceFactory()
    {
        _azureBlobService = new Mock<IAzureBlobService>();
    }

    public AzureBlobServiceFactory WithUploadFile(string returnMessage = "Success")
    {
        _azureBlobService
            .Setup(o => o.UploadFileToBlobAsync(It.IsAny<IFormFile>(), It.IsAny<string>(), CancellationToken.None))
            .ReturnsAsync(returnMessage);

        return this;
    }

    public AzureBlobServiceFactory WithDeleteFileSuccess(string? returnMessage)
    {
        _azureBlobService
            .Setup(o => o.DeleteBlobAsync(It.IsAny<string>(), CancellationToken.None))
            .ReturnsAsync(true);

        return this;
    }

    public AzureBlobServiceFactory WithDeleteFileFail(string? returnMessage)
    {
        _azureBlobService
            .Setup(o => o.DeleteBlobAsync(It.IsAny<string>(), CancellationToken.None))
            .ReturnsAsync(false);

        return this;
    }

    public IAzureBlobService Build()
    {
        return _azureBlobService.Object;
    }
}