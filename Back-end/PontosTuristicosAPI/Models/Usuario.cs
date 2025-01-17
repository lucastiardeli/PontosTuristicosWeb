using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PontosTuristicosAPI.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [ForeignKey("TipoUsuario")]
        public int IdTipoUsuario { get; set; }

        [Required, StringLength(50)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(40)]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(500)]
        public string Senha { get; set; } = string.Empty;

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required, StringLength(11)]
        public string Celular { get; set; } = string.Empty;

        [Required, StringLength(11)]
        public string CPF { get; set; } = string.Empty;

        [Required, StringLength(2)]
        public string Estado { get; set; } = string.Empty;

        [Required, StringLength(40)]
        public string Cidade { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Foto { get; set; }

        [Required]
        public DateTime InclusaoDataHora { get; set; }
    }
}