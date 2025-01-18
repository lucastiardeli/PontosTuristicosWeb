using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PontosTuristicosAPI.Models;
using PontosTuristicosAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using PontosTuristicosAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;

namespace PontosTuristicosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Verificando se o usuário existe
            var usuario = _context.Usuarios
                .FirstOrDefault(u => u.Email == loginRequest.Email);

            if (usuario == null || !CryptographicOperations.FixedTimeEquals(
                    Encoding.UTF8.GetBytes(usuario.Senha),
                    Encoding.UTF8.GetBytes(HashHelper.GerarHashSHA256(loginRequest.Senha))))
            {
                return Unauthorized("Credenciais inválidas");
            }

            // Obter o Tipo de Usuário associado ao usuário
            var tipoUsuario = _context.TiposUsuarios
                .FirstOrDefault(t => t.IdTipoUsuario == usuario.IdTipoUsuario);

            if (tipoUsuario == null)
            {
                return Unauthorized("Tipo de usuário não encontrado");
            }

            // Gerar o token JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GetSecretKey()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: GetIssuer(),
                audience: GetAudience(),
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Retornar o token JWT
            return Ok(new
            {
                Token = tokenString,
                tipoUsuario = tipoUsuario.Descricao,
                Validade = DateTime.UtcNow.AddHours(1)
            });
        }

        private string GetSecretKey() => _configuration["JwtSettings:SecretKey"];
        private string GetIssuer() => _configuration["JwtSettings:Issuer"];
        private string GetAudience() => _configuration["JwtSettings:Audience"];
    }
}