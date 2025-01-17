using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PontosTuristicosAPI.Models
{
    public class TipoUsuario
    {
        [Key]
        public int IdTipoUsuario { get; set; }

        [Required, StringLength(30)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public DateTime InclusaoDataHora { get; set; }
    }
}