﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PontosTuristicosAPI.Data;

#nullable disable

namespace PontosTuristicosAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PontosTuristicosAPI.Models.CriterioAvaliacao", b =>
                {
                    b.Property<int>("IdCriterioAvaliacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCriterioAvaliacao"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<DateTime>("InclusaoDataHora")
                        .HasColumnType("datetime2");

                    b.Property<int>("Valor")
                        .HasColumnType("int");

                    b.HasKey("IdCriterioAvaliacao");

                    b.ToTable("CriteriosAvaliacoes");

                    b.HasData(
                        new
                        {
                            IdCriterioAvaliacao = 1,
                            Descricao = "Muito ruim",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8794),
                            Valor = 1
                        },
                        new
                        {
                            IdCriterioAvaliacao = 2,
                            Descricao = "Ruim",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8795),
                            Valor = 2
                        },
                        new
                        {
                            IdCriterioAvaliacao = 3,
                            Descricao = "Médio",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8796),
                            Valor = 3
                        },
                        new
                        {
                            IdCriterioAvaliacao = 4,
                            Descricao = "Bom",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8797),
                            Valor = 4
                        },
                        new
                        {
                            IdCriterioAvaliacao = 5,
                            Descricao = "Muito bom",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8798),
                            Valor = 5
                        });
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.PontoTuristico", b =>
                {
                    b.Property<int>("IdPontoTuristico")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdPontoTuristico"));

                    b.Property<string>("Cidade")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<string>("Foto")
                        .HasColumnType("VarChar(MAX)");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<DateTime>("InclusaoDataHora")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Referencia")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdPontoTuristico");

                    b.ToTable("PontosTuristicos");
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.PontoTuristicoAvaliacao", b =>
                {
                    b.Property<int>("IdPontoTuristicoAvaliacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdPontoTuristicoAvaliacao"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("IdCriterioAvaliacao")
                        .HasColumnType("int");

                    b.Property<int>("IdPontoTuristico")
                        .HasColumnType("int");

                    b.Property<int>("IdUsuario")
                        .HasColumnType("int");

                    b.Property<DateTime>("InclusaoDataHora")
                        .HasColumnType("datetime2");

                    b.HasKey("IdPontoTuristicoAvaliacao");

                    b.ToTable("PontosTuristicosAvaliacoes");
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.TipoUsuario", b =>
                {
                    b.Property<int>("IdTipoUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTipoUsuario"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<DateTime>("InclusaoDataHora")
                        .HasColumnType("datetime2");

                    b.HasKey("IdTipoUsuario");

                    b.ToTable("TiposUsuarios");

                    b.HasData(
                        new
                        {
                            IdTipoUsuario = 1,
                            Descricao = "Guia",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8683)
                        },
                        new
                        {
                            IdTipoUsuario = 2,
                            Descricao = "Visitante",
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8693)
                        });
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUsuario"));

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<string>("Celular")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<string>("Cidade")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<DateTime>("DataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Estado")
                        .IsRequired()
                        .HasMaxLength(2)
                        .HasColumnType("nvarchar(2)");

                    b.Property<int>("IdTipoUsuario")
                        .HasColumnType("int");

                    b.Property<DateTime>("InclusaoDataHora")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("IdUsuario");

                    b.ToTable("Usuarios");

                    b.HasData(
                        new
                        {
                            IdUsuario = 1,
                            CPF = "51954386842",
                            Celular = "14997646017",
                            Cidade = "Tupã",
                            DataNascimento = new DateTime(2002, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "admin@gmail.com",
                            Estado = "SP",
                            IdTipoUsuario = 1,
                            InclusaoDataHora = new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(9461),
                            Nome = "admin",
                            Senha = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
