using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreCotext : DbContext
{
    public StoreCotext(DbContextOptions<StoreCotext> options) : base(options) { }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseSqlite("Data source=store.db");
    }

    public DbSet<Product> Products => Set<Product>();
}