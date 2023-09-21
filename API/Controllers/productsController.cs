using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class productsController : BaseApiCOntroller
{
    private readonly StoreCotext _context;

    public productsController(StoreCotext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }


    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }


}