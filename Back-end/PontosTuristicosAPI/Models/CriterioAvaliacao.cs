using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PontosTuristicosAPI.Models
{
    public class CriterioAvaliacao
    {
        [Key]
        public int IdCriterioAvaliacao { get; set; }

        [Required, StringLength(30)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public int Valor { get; set; }

        [Required]
        public DateTime InclusaoDataHora { get; set; }
    }
}