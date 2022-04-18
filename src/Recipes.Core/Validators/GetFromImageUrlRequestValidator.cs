using FluentValidation;
using Recipes.Core.Services;

namespace Recipes.Core.Validators;

public class GetFromImageUrlRequestValidator : AbstractValidator<GetFromImageUrlRequest>
{
    public GetFromImageUrlRequestValidator()
    {
        RuleFor(request => request.Url)
            .NotNull();

        RuleFor(request => request.Url)
            .Must(url => ValidationConstants.AllowedUrlTypes.Any(url.StartsWith))
            .WithMessage("Url must be http or https");
        
        RuleFor(request => request.Url)
            .Must(url => ValidationConstants.AllowedImageTypes.Any(url.EndsWith))
            .WithMessage("Url must be for a valid image type");
    }
}

public static class ValidationConstants
{
    public static readonly List<string> AllowedUrlTypes = new()
    {
        "http://", "https://"
    };

    public static readonly List<string> AllowedImageTypes = new()
    {
        ".jpg", ".jpeg", ".png"
    };
}