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
    public class CriteriosAvaliacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CriteriosAvaliacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CriterioAvaliacao>>> GetCriteriosAvaliacoes()
        {
            return await _context.CriteriosAvaliacoes.ToListAsync();
        }

        // GET: api/CriteriosAvaliacoes/{IdCriterioAvaliacao}
        [HttpGet("{idCriterioAvaliacao}")]
        public async Task<ActionResult<CriterioAvaliacao>> GetCriterioAvaliacao(int idCriterioAvaliacao)
        {
            var criterio = await _context.CriteriosAvaliacoes.FindAsync(idCriterioAvaliacao);

            if (criterio == null)
                return NotFound();

            return criterio;
        }

    }
}