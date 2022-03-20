using Recipes.Api.Constants;
using Recipes.Api.IoC;

var builder = WebApplication.CreateBuilder(args);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddCommandHandling()
    .ConfigureControllers()
    .AddDataAccess()
    .AddCors()
    .ConfigureLogging();

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
app.UseControllers();
app.UseCors(CorsPolicies.ApplicationUiPolicy);
app.Run();