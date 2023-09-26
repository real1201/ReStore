using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
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
    public async Task<ActionResult<PageList<Product>>>
    GetProducts([FromQuery] ProductParams productParams)
    {
        var query = _context.Products
                    .Sort(productParams.OrderBy)
                    .SearchTerm(productParams.searchTerm)
                    .Filters(productParams.Brands, productParams.Types)
                    .AsQueryable();

        var products = await PageList<Product>
        .ToPageList(query, productParams.PageNumber, productParams.PageSze);
        Response.AddPaginationHeader(products.MetaData);
        return products;

    }


    [HttpGet("{id:Guid}")]
    public async Task<ActionResult<Product>> GetProduct(Guid id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
        return Ok(new { brands, types });
    }


}