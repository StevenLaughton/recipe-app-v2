using System.Reflection;
using MediatR;
using Recipes.Api.Constants;
using Recipes.Api.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(Assembly.GetExecutingAssembly());
builder.AddDataAccess();
builder.AddCors();
builder.ConfigureLogging();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(CorsPolicies.ApplicationUiPolicy);
app.Run();