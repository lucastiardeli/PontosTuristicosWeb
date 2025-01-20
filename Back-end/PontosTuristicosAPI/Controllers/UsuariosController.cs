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
            if (usuarioIncluir == null)
                return BadRequest("Usuário inválido.");

            // Verifica se já existe um usuário com o mesmo CPF
            var usuarioComMesmoCpf = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.CPF == usuarioIncluir.CPF);
            if (usuarioComMesmoCpf != null)
                return Conflict("Já existe um usuário com este CPF.");

            // Verifica se já existe um usuário com o mesmo e-mail
            var usuarioComMesmoEmail = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == usuarioIncluir.Email);
            if (usuarioComMesmoEmail != null)
                return Conflict("Já existe um usuário com este e-mail.");

            // Gera o hash da senha
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
        public async Task<IActionResult> PutUsuario(int idUsuario)
        {
            // Verificando se o id do usuário foi fornecido
            var usuarioAtualizar = await _context.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);
            if (usuarioAtualizar == null) return NotFound($"Usuário não encontrado.");

            // Alterando o tipo de usuário (supondo que tenha um campo TipoUsuario na sua tabela)
            usuarioAtualizar.IdTipoUsuario = usuarioAtualizar.IdTipoUsuario == 1 ? 2 : 1;

            // Salvando as alterações no banco
            await _context.SaveChangesAsync();

            return Ok(usuarioAtualizar);
        }
    }
}