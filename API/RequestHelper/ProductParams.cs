namespace API.RequestHelper;

public class ProductParams : Pagination
{

    public string OrderBy { get; set; }
    public string searchTerm { get; set; }
    public string Brands { get; set; }
    public string Types { get; set; }
}
