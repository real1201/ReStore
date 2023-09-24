using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class basketController : BaseApiCOntroller
{
    private readonly StoreCotext _context;
    private readonly IMapper _mapper;

    public basketController(StoreCotext context, IMapper mapper)
    {
        _mapper = mapper;
        _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketResponse>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();
        return MapBasketResponse(basket);
    }



    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(Guid productId, int quantity)
    {
        //get basket or create basket if null
        var basket = await RetrieveBasket();
        if (basket == null) basket = CreateBasket();
        //get product and find
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound(new ProblemDetails { Title = "Product not found." });
        //add item
        basket.AddItem(product, quantity);
        //save changes
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtRoute("GetBasket", MapBasketResponse(basket));
        return BadRequest(new ProblemDetails { Title = "Problem saving item in the basket" });
    }



    [HttpDelete]
    public async Task<ActionResult> RemoveIteFromBasket(Guid productId, int quantity)
    {
        //get item
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();
        //remove item or reduce quantity
        basket.RemoveItem(productId, quantity);

        //sae changes
        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();
        return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
    }

    private BasketResponse MapBasketResponse(Basket basket)
    {
        return new BasketResponse
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            BasketItems = basket.BasketIems.Select(x => new BasketItemResponse
            {
                ProductId = x.ProductId,
                Name = x.Product.Name,
                Price = x.Product.Price,
                ImageUrl = x.Product.ImageUrl,
                Brand = x.Product.Brand,
                Type = x.Product.Type,
                Quantity = x.Quantity,
                QuantityInStock = x.Product.QuantityInStock
            }).ToList()
        };
    }

    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.Now.AddDays(30)
        };

        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        var basket = new Basket { BuyerId = buyerId };
        _context.Baskets.Add(basket);
        return basket;
    }


    private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets
                            .Include(x => x.BasketIems)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
    }

}
