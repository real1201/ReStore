using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table(name: "BasketItems")]
public class BasketItem
{
    public Guid Id { get; set; }
    public int Quantity { get; set; }


    //navigation
    public Guid ProductId { get; set; }
    public Product Product { get; set; }

    public Guid BasketId { get; set; }
    public Basket Basket { get; set; }
}
