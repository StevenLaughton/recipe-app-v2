using Microsoft.EntityFrameworkCore;

namespace Recipes.Infrastructure.Models;

public class PaginatedList<T>
{
    // public int PageIndex { get; private set; }
    // public int TotalPages { get; private set; }
    public List<T> Data { get; set; } = new List<T>();

    public bool HasNextPage { get; set; }
    // public bool HasNextPage => PageIndex < TotalPages;

    public PaginatedList(IEnumerable<T> items, int count, int pageIndex, int pageSize)
    {
        // var pageIndex = pageIndex;
        var totalPages = (int) Math.Ceiling(count / (double) pageSize);
        HasNextPage = pageIndex < totalPages;
        Data.AddRange(items);
    }


    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize,
        CancellationToken cancellationToken)
    {
        var count = await source.CountAsync(cancellationToken);
        var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync(cancellationToken);
        return new PaginatedList<T>(items, count, pageIndex, pageSize);
    }
}