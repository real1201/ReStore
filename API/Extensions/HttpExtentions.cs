using System.Text.Json;
using API.RequestHelper;

namespace API.Extensions;

public static class HttpExtentions
{
    public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
    {
        var otpions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, otpions));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
