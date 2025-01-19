using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PontosTuristicosAPI.Models
{
    public class PontoTuristico
    {
        [Key]
        public int IdPontoTuristico { get; set; }

        [Required, StringLength(50)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(2)]
        public string Estado { get; set; } = string.Empty;

        [Required, StringLength(30)]
        public string Cidade { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Referencia { get; set; }

        [Required, StringLength(100)]
        public string Descricao { get; set; } = string.Empty;

        public string? Foto { get; set; }

        [Required]
        public DateTime InclusaoDataHora { get; set; }

        [Required, ForeignKey("IdUsuario")]
        public int IdUsuario { get; set; }
    }
}