using Microsoft.AspNetCore.Mvc;
using PontosTuristicosAPI.Models;
using PontosTuristicosAPI.Data;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PontosTuristicosAPI.Helpers;


namespace PontosTuristicosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios = await _context.Usuarios.ToListAsync();
            if (usuarios == null || !usuarios.Any()) return NotFound("Nenhum usuário encontrado.");

            return Ok(usuarios);
        }

        // GET: api/Usuarios/{IdUsuario}
        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> GetUsuario(int idUsuario)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);
            if (usuario == null) return NotFound($"Usuário não encontrado.");

            return Ok(usuario);
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<IActionResult> PostUsuario([FromBody] Usuario usuarioIncluir)
        {
            if (usuarioIncluir == null) return BadRequest("Usuário inválido.");

            usuarioIncluir.Senha = HashHelper.GerarHashSHA256(usuarioIncluir.Senha);

            // Definindo as datas de inclusão
            usuarioIncluir.InclusaoDataHora = DateTime.Now;

            // Salvando o usuário no banco de dados
            await _context.Usuarios.AddAsync(usuarioIncluir);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostUsuario), new { idUsuario = usuarioIncluir.IdUsuario }, usuarioIncluir);

        }

        // PUT: api/Usuarios/{IdUsuario}
        [HttpPut("{idUsuario}")]
        public async Task<IActionResult> PutUsuario(int idUsuario, [FromBody] Usuario usuario)
        {
            if (usuario == null || idUsuario != usuario.IdUsuario) return BadRequest("Usuário inválido.");

            var usuarioAtualizar = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);
            if (usuarioAtualizar == null) return NotFound($"Usuário não encontrado.");

            // Atualizando os dados do usuário
            usuarioAtualizar.Nome = usuario.Nome;
            usuarioAtualizar.Email = usuario.Email;
            usuarioAtualizar.DataNascimento = usuario.DataNascimento;
            usuarioAtualizar.Celular = usuario.Celular;
            usuarioAtualizar.CPF = usuario.CPF;
            usuarioAtualizar.Estado = usuario.Estado;
            usuarioAtualizar.Cidade = usuario.Cidade;
            usuarioAtualizar.Senha = usuario.Senha;

            // Salvando as alterações no banco
            await _context.SaveChangesAsync();

            return NoContent();  // Retorna status 204 (sem conteúdo)
        }

        // DELETE: api/Usuarios/{IdUsuario}
        [HttpDelete("{idUsuario}")]
        public async Task<IActionResult> DeleteUsuario(int idUsuario)
        {
            var usuarioExcluir = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);
            if (usuarioExcluir == null) return NotFound($"Usuário não encontrado.");

            // Removendo o usuário do banco de dados
            _context.Usuarios.Remove(usuarioExcluir);
            await _context.SaveChangesAsync();

            return NoContent();  // Retorna status 204 (sem conteúdo)
        }
    }
}