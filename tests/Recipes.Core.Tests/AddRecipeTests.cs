using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Moq;
using Recipes.Core.Services;
using Recipes.Core.Tests.Factories;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;
using Xunit;
using Xunit.Extensions.AssertExtensions;

namespace Recipes.Core.Tests;

public class AddRecipeTests
{
    private readonly AddRecipe _fixture;
    private readonly DatabaseContext _context;

    public AddRecipeTests()
    {
        _context = DatabaseContextFactory.Create();
        var azureBlobService = new AzureBlobServiceFactory()
            .WithUploadFile()
            .Build();

        _context.Initialise();

        _fixture = new AddRecipe(_context, azureBlobService);
    }

    [Fact]
    public async Task Should_Add_Recipe()
    {
        // Arrange
        var request = new AddRecipeRequest(new RecipeDto
        {
            Id = 1,
            Name = "TEST",
            Fare = Fare.Food
        });
        // Act
        var result = await _fixture.Handle(request, CancellationToken.None);

        // Assert
        result.ShouldBeTrue();
        var recipeFromDatabase = _context.Find<Recipe>(1);
        recipeFromDatabase.ShouldNotBeNull();
        recipeFromDatabase?.Name.ShouldEqual("TEST");
        recipeFromDatabase?.Fare.ShouldEqual(Fare.Food);
    }

    [Fact]
    public async Task Should_Add_Recipe_With_Image()
    {
        // Arrange
        var request = new AddRecipeRequest(new RecipeDto
        {
            Id = 1,
            Name = "TEST",
            Fare = Fare.Food,
            Image = new Mock<IFormFile>().Object
        });

        // Act
        var result = await _fixture.Handle(request, CancellationToken.None);

        // Assert
        result.ShouldBeTrue();
        var recipeFromDatabase = _context.Find<Recipe>(1);
        recipeFromDatabase?.ImageUrl.ShouldEqual("Success");
    }
}