using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PontosTuristicosAPI.Data;
using PontosTuristicosAPI.Models;


namespace PontosTuristicosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PontosTuristicosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PontosTuristicosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPontosTuristicos([FromQuery] string q = "", [FromQuery] int _page = 1, [FromQuery] int _limit = 5)
        {
            // Paginação
            var skip = (_page - 1) * _limit;

            // Filtro de busca
            var query = _context.PontosTuristicos.AsQueryable();

            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(p => p.Nome.Contains(q));
            }

            // Paginação com filtro
            var totalCount = await query.CountAsync();
            var pontosTuristicos = await query
                .Skip(skip)
                .Take(_limit)
                .ToListAsync();

            var result = new
            {
                totalCount,
                pontosTuristicos
            };

            return Ok(result);
        }

        // GET: api/pontosturisticos/usuario/{idUsuario}
        [HttpGet("usuario/{idUsuario}")]
        public async Task<IActionResult> GetPontosTuristicosPorUsuario(int idUsuario, [FromQuery] string q = "", [FromQuery] int _page = 1, [FromQuery] int _limit = 5)
        {
            // Paginação
            var skip = (_page - 1) * _limit;

            // Filtro de busca para os pontos turísticos do usuário
            var query = _context.PontosTuristicos
                .Where(p => p.IdUsuario == idUsuario)
                .AsQueryable();

            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(p => p.Nome.Contains(q));
            }

            // Paginação com filtro
            var totalCount = await query.CountAsync();
            var pontosTuristicos = await query
                .Skip(skip)
                .Take(_limit)
                .ToListAsync();

            var result = new
            {
                totalCount,
                pontosTuristicos
            };

            return Ok(result);
        }

        // GET: api/pontosturisticos/{idPontoTuristico}
        [HttpGet("{idPontoTuristico}")]
        public async Task<ActionResult<PontoTuristico>> GetPontoTuristico(int idPontoTuristico)
        {
            var ponto = await _context.PontosTuristicos.FindAsync(idPontoTuristico);

            if (ponto == null)
                return NotFound();

            return ponto;
        }

        // POST: api/pontosturisticos
        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> PostPontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontosTuristicos.Add(pontoTuristico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPontoTuristico), new { idPontoTuristico = pontoTuristico.IdPontoTuristico }, pontoTuristico);
        }

        // PUT: api/pontosturisticos/{idPontoTuristico}
        [HttpPut("{idPontoTuristico}")]
        public async Task<IActionResult> PutPontoTuristico(int idPontoTuristico, PontoTuristico pontoAtualizado)
        {
            if (idPontoTuristico != pontoAtualizado.IdPontoTuristico)
                return BadRequest();

            _context.Entry(pontoAtualizado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.PontosTuristicos.Any(e => e.IdPontoTuristico == idPontoTuristico))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{idPontoTuristico}")]
        public async Task<IActionResult> DeletePontoTuristico(int idPontoTuristico)
        {
            var pontoExcluir = await _context.PontosTuristicos.FindAsync(idPontoTuristico);
            if (pontoExcluir == null)
                return NotFound();

            _context.PontosTuristicos.Remove(pontoExcluir);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}