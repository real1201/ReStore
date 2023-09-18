using API.Controllers;
using API.Data;
using Microsoft.EntityFrameworkCore;

//for builder
#region 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreCotext>();

builder.Services.AddCors();

#endregion

// for app
#region 
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
}
);

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
#endregion
// seed data in the database
#region 
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreCotext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitializer.DataInitialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "An Error occured during migrations/seeding data");
}
#endregion

app.Run();
