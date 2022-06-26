using Recipes.Api.Constants;
using Recipes.Api.IoC;
using Recipes.Azure.Implementations;
using Recipes.Azure.Interfaces;
using Recipes.Azure.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AzureBlobConfiguration>(builder.Configuration.GetSection(nameof(AzureBlobConfiguration)));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

builder.AddCommandHandling()
    .ConfigureControllers()
    .AddDataAccess()
    .AddCors()
    .ConfigureLogging()
    .AddModelValidation();

builder.Services.AddScoped<IAzureBlobService, AzureBlobService>();

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
app.UseCors(CorsPolicies.ApplicationUiPolicy);
app.UseControllers();

app.Run();