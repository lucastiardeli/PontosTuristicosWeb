using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PontosTuristicosAPI.Models
{
    public class PontoTuristicoAvaliacao
    {
        [Key]
        public int IdPontoTuristicoAvaliacao { get; set; }

        [Required, ForeignKey("CriterioAvaliacao")]
        public int IdCriterioAvaliacao { get; set; }

        [Required, StringLength(100)]
        public string Descricao { get; set; } = string.Empty;

        [Required, ForeignKey("IdPontoTuristico")]
        public int IdPontoTuristico { get; set; }

        [Required, ForeignKey("IdUsuario")]
        public int IdUsuario { get; set; }

        [Required]
        public DateTime InclusaoDataHora { get; set; }
    }
}