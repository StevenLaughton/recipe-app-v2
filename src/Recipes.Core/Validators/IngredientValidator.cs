using FluentValidation;
using Recipes.Infrastructure.Dtos;
using Recipes.Infrastructure.Entities;
using Recipes.Infrastructure.Interfaces;

namespace Recipes.Core.Validators;

public class IngredientInterfaceValidator : AbstractValidator<IIngredient>
{
    public IngredientInterfaceValidator()
    {
        RuleFor(ing => ing.Text)
            .NotNull()
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(ing => ing.Quantity)
            .GreaterThan(0)
            .When(ing => ing.Quantity is not null);
    }
}

public class IngredientDtoValidator : AbstractValidator<IngredientDto>
{
    public IngredientDtoValidator()
    {
        Include(new IngredientInterfaceValidator());
    }
}

public class IngredientValidator : AbstractValidator<Ingredient>
{
    public IngredientValidator()
    {
        Include(new IngredientInterfaceValidator());
    }
}