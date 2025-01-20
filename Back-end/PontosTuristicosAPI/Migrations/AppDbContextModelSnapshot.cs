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
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IdPontoTuristico");

                    b.HasIndex("IdUsuario");

                    b.ToTable("PontosTuristicos");
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
                            InclusaoDataHora = new DateTime(2025, 1, 20, 18, 9, 42, 638, DateTimeKind.Local).AddTicks(2572)
                        },
                        new
                        {
                            IdTipoUsuario = 2,
                            Descricao = "Visitante",
                            InclusaoDataHora = new DateTime(2025, 1, 20, 18, 9, 42, 638, DateTimeKind.Local).AddTicks(2584)
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
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

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
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("IdUsuario");

                    b.HasIndex("IdTipoUsuario");

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
                            InclusaoDataHora = new DateTime(2025, 1, 20, 18, 9, 42, 638, DateTimeKind.Local).AddTicks(3373),
                            Nome = "admin",
                            Senha = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
                        });
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.PontoTuristico", b =>
                {
                    b.HasOne("PontosTuristicosAPI.Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("IdUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_PontoTuristico_Usuario");
                });

            modelBuilder.Entity("PontosTuristicosAPI.Models.Usuario", b =>
                {
                    b.HasOne("PontosTuristicosAPI.Models.TipoUsuario", null)
                        .WithMany()
                        .HasForeignKey("IdTipoUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Usuario_TipoUsuario");
                });
#pragma warning restore 612, 618
        }
    }
}
