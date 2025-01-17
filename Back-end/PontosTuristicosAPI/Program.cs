using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PontosTuristicosAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Permitir", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Especifique os domínios permitidos
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Adicionar serviços
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();


// Configurar o DbContext para usar o SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configurar o pipeline de requisições
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        options.RoutePrefix = "swagger"; // O Swagger UI será acessado aqui
    });

}

// Usar a política de CORS
app.UseCors("Permitir");
app.UseAuthorization();
app.MapControllers();

app.Run();