using System.Web;

namespace Recipes.Core.Extensions;

public static class UrlExtensions
{
    public static string DecodeUrl(this string url)
    {
        return HttpUtility.UrlDecode(url);
    }

    public static string GetImageType(this string url)
    {
        return Path.GetExtension(url)[1..];
    }
}