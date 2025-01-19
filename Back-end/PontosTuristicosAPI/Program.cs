using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PontosTuristicosAPI.Data;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Adicionar suporte ao CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Permitir", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Especifique os domínios permitidos
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Adicionando a autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
        };
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

// Usar autenticação e autorização
app.UseAuthentication();
app.UseAuthorization();

// Configuração para servir arquivos estáticos da pasta wwwroot/imagens
app.UseStaticFiles(); // Serve arquivos estáticos de wwwroot

// Caso queira servir especificamente a pasta 'wwwroot/imagens'
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens")),
    RequestPath = "/imagens" // Isso mapeia para "/imagens" no URL
});

app.MapControllers();

app.Run();
