using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PontosTuristicosAPI.Helpers;
using PontosTuristicosAPI.Models;

namespace PontosTuristicosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PontoTuristico> PontosTuristicos { get; set; }

        public DbSet<TipoUsuario> TiposUsuarios { get; set; }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                        .HasOne<TipoUsuario>()
                        .WithMany()
                        .HasForeignKey(u => u.IdTipoUsuario)
                        .HasConstraintName("FK_Usuario_TipoUsuario");

            modelBuilder.Entity<PontoTuristico>()
                        .HasOne<Usuario>()
                        .WithMany()
                        .HasForeignKey(pt => pt.IdUsuario)
                        .HasConstraintName("FK_PontoTuristico_Usuario");

            modelBuilder.Entity<PontoTuristico>()
                        .Property(p => p.Foto)
                        .HasColumnType("VarChar(MAX)");
            Alimentar(modelBuilder);
        }

        public static void Alimentar(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoUsuario>().HasData(

                new TipoUsuario
                {
                    IdTipoUsuario = 1,
                    Descricao = "Guia",
                    InclusaoDataHora = DateTime.Now
                },
                new TipoUsuario
                {
                    IdTipoUsuario = 2,
                    Descricao = "Visitante",
                    InclusaoDataHora = DateTime.Now
                }

            );

            modelBuilder.Entity<Usuario>().HasData(

                new Usuario
                {
                    IdUsuario = 1,
                    IdTipoUsuario = 1,
                    Nome = "admin",
                    Email = "admin@gmail.com",
                    Senha = HashHelper.GerarHashSHA256("admin"),
                    DataNascimento = new DateTime(2002, 4, 3),
                    Celular = "14997646017",
                    CPF = "51954386842",
                    Estado = "SP",
                    Cidade = "Tupã",
                    InclusaoDataHora = DateTime.Now
                }

            );

        }
    }
}