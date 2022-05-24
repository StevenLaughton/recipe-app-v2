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

    public static string? GetFilenameFromUrl(this string? url)
    {
        return url is null ? null : new Uri(url).AbsolutePath.Split('/').Last();
    }
}