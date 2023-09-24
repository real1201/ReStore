namespace API.Entities;

public class Basket
{
    public Guid Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> BasketIems { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        if (BasketIems.All(item => item.ProductId != product.Id))
        {
            BasketIems.Add(new BasketItem { Product = product, Quantity = quantity });
        }
        var existingItem = BasketIems.FirstOrDefault(item => item.ProductId == product.Id);
        if (existingItem != null) existingItem.Quantity += quantity;
    }

    public void RemoveItem(Guid productId, int quantity)
    {
        var item = BasketIems.FirstOrDefault(item => item.ProductId == productId);
        if (item == null) return;
        item.Quantity -= quantity;
        if (item.Quantity == 0) BasketIems.Remove(item);
    }
}