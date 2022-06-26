using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Moq;
using Recipes.Api.Controllers;
using Recipes.Core.Services;
using Recipes.Core.Tests.Factories;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Enums;
using Xunit;

namespace Recipes.Api.Tests;

public class RecipesControllerTests
{
    [Fact]
    public async Task Should_Get_Food_Recipe_List()
    {
        //Arrange
        var mediator = new Mock<IMediator>();
        // mediator.Setup(m => m.Send(It.IsAny<GetRecipeListRequest>(), It.IsAny<CancellationToken>()))
        //     .ReturnsAsync(It.IsAny<List<RecipeListItemDto>>());
        // var controller = new RecipesController(mediator.Object);
        //
        // //Act
        // await mediator.Object.Send(new GetRecipeListRequest(Fare.Food));
        // // controller.GetList()

        //Assert
        mediator.Verify(x => x.Send(It.IsAny<GetRecipeListRequest>(), It.IsAny<CancellationToken>()));
    }
}