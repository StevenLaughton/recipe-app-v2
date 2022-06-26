using System.Threading;
using System.Threading.Tasks;
using Recipes.Azure.Implementations;
using Recipes.Core.Services;
using Recipes.Core.Tests.Factories;
using Recipes.Infrastructure;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Enums;
using Xunit;
using Xunit.Extensions.AssertExtensions;

namespace Recipes.Core.Tests;

public class EditRecipeTests
{
    private readonly EditRecipe _fixture;
    private readonly DatabaseContext _context;

    public EditRecipeTests()
    {
        _context = DatabaseContextFactory.Create();
        var azureBlobService = new AzureBlobServiceFactory()
            .WithUploadFile()
            .Build();

        _context.Initialise();

        _fixture = new EditRecipe(_context, azureBlobService);
    }

    [Fact]
    public async Task Should_Update_Recipe_Name()
    {
        // Arrange
        var recipe = new Recipe
        {
            Id = 1,
            Name = "TEST",
            Fare = Fare.Food
        };
        _context.Add(recipe);
        await _context.SaveChangesAsync();

        var editRecipeRequest = new EditRecipeRequest(new RecipeDto
        {
            Id = 1,
            Name = "NEW NAME",
            Fare = Fare.Food
        });

        // Assert
        var response = await _fixture.Handle(editRecipeRequest, CancellationToken.None);
        
        // Act
        response.ShouldBeTrue();
        var recipeFromDatabase = await _context.FindAsync<Recipe>(1);
        recipeFromDatabase.ShouldNotBeNull();
        recipeFromDatabase?.Name.ShouldEqual("NEW NAME");
        recipeFromDatabase?.Fare.ShouldEqual(Fare.Food);
    }
}