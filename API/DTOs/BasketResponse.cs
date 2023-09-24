namespace API.DTOs;

public class BasketResponse
{
    public Guid Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItemResponse> BasketItems { get; set; }

}
