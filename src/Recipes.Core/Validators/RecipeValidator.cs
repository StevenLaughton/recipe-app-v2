using FluentValidation;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Interfaces;

namespace Recipes.Core.Validators;

public class RecipeInterfaceValidator : AbstractValidator<IRecipe>
{
    public RecipeInterfaceValidator()
    {
        RuleFor(recipe => recipe.Name)
            .NotNull()
            .NotEmpty()
            .MaximumLength(256);
        
        RuleFor(recipe => recipe.Portions)
            .GreaterThan(0);
    }
}

public class RecipeDtoValidator : AbstractValidator<RecipeDto>
{
    public RecipeDtoValidator()
    {
        Include(new RecipeInterfaceValidator());
        RuleForEach(recipe => recipe.Ingredients)
            .SetValidator(new IngredientDtoValidator());
    }
}

public class RecipeValidator : AbstractValidator<Recipe>
{
    public RecipeValidator()
    {
        Include(new RecipeInterfaceValidator());
        RuleForEach(recipe => recipe.Ingredients)
            .SetValidator(new IngredientValidator());
    }
}