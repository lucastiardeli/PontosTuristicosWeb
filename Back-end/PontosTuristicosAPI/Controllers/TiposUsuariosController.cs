using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontosTuristicosAPI.Data;

namespace PontosTuristicosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiposUsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TiposUsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/TiposUsuarios
        [HttpGet]
        public async Task<IActionResult> GetTiposUsuarios()
        {
            var tiposUsuarios = await _context.TiposUsuarios.ToListAsync();
            if (tiposUsuarios == null || !tiposUsuarios.Any()) return NotFound("Nenhum tipo de usuário encontrado.");

            return Ok(tiposUsuarios);
        }

        // GET: api/TiposUsuarios/{IdTipoUsuario}
        [HttpGet("{idTipoUsuario}")]
        public async Task<IActionResult> GetTipoUsuario(int idTipoUsuario)
        {
            var tipoUsuario = await _context.TiposUsuarios.FirstOrDefaultAsync(t => t.IdTipoUsuario == idTipoUsuario);
            if (tipoUsuario == null) return NotFound($"Tipo Usuário não encontrado.");

            return Ok(tipoUsuario);
        }

    }
}