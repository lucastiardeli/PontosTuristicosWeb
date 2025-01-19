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
                query = query.Where(p => p.Nome.Contains(q) || p.Descricao.Contains(q) || p.Referencia.Contains(q));
            }

            // Ordenar por InclusaoDataHora (mais recentes primeiro)
            query = query.OrderByDescending(p => p.InclusaoDataHora);

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
            var query = _context.PontosTuristicos.Where(p => p.IdUsuario == idUsuario).AsQueryable();

            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(p => p.Nome.Contains(q) || p.Descricao.Contains(q) || p.Referencia.Contains(q));
            }

            // Ordenar por InclusaoDataHora (mais recentes primeiro)
            query = query.OrderByDescending(p => p.InclusaoDataHora);

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

        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> PostPontoTuristico([FromBody] PontoTuristico pontoTuristico)
        {
            if (pontoTuristico.Foto != null)
            {
                // Decodifica a string Base64 para um array de bytes
                byte[] imagemBytes = Convert.FromBase64String(pontoTuristico.Foto);

                // Define o diretório onde as imagens serão armazenadas
                var diretorioImagens = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");

                // Verifica se o diretório existe, se não, cria
                if (!Directory.Exists(diretorioImagens))
                {
                    Directory.CreateDirectory(diretorioImagens);
                }

                // Gera o nome do arquivo da imagem
                string nomeImagem = $"{Guid.NewGuid()}.jpg";

                // Define o caminho completo para armazenar a imagem no servidor
                string caminhoImagem = Path.Combine(diretorioImagens, nomeImagem);

                // Salva o arquivo de imagem no diretório especificado
                await System.IO.File.WriteAllBytesAsync(caminhoImagem, imagemBytes);

                // Salva apenas o nome da imagem no banco de dados
                pontoTuristico.Foto = nomeImagem;
            }

            pontoTuristico.InclusaoDataHora = DateTime.Now;

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

            if (!string.IsNullOrEmpty(pontoAtualizado.Foto) && IsBase64(pontoAtualizado.Foto))
            {
                // Decodifica a string Base64 para um array de bytes
                byte[] imagemBytes = Convert.FromBase64String(pontoAtualizado.Foto);

                // Define o diretório onde as imagens serão armazenadas
                var diretorioImagens = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");

                // Verifica se o diretório existe, se não, cria
                if (!Directory.Exists(diretorioImagens))
                {
                    Directory.CreateDirectory(diretorioImagens);
                }

                // Gera o nome do arquivo da imagem
                string nomeImagem = $"{Guid.NewGuid()}.jpg";

                // Define o caminho completo para armazenar a imagem no servidor
                string caminhoImagem = Path.Combine(diretorioImagens, nomeImagem);

                // Salva o arquivo de imagem no diretório especificado
                await System.IO.File.WriteAllBytesAsync(caminhoImagem, imagemBytes);

                // Salva apenas o nome da imagem no banco de dados
                pontoAtualizado.Foto = nomeImagem;
            }

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

        // Função para verificar se a string é base64
        private bool IsBase64(string str)
        {
            try
            {
                // Tenta converter a string para base64 e verificar seu formato
                Convert.FromBase64String(str);
                return true;
            }
            catch
            {
                return false;
            }
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