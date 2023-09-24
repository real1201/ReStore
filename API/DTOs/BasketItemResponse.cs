namespace API.DTOs;

public class BasketItemResponse
{
    public Guid ProductId { get; set; }
    public string Name { get; set; }
    public long Price { get; set; }
    public string ImageUrl { get; set; }
    public string Brand { get; set; }
    public string Type { get; set; }
    public int Quantity { get; set; }
    public int QuantityInStock { get; set; }
}
