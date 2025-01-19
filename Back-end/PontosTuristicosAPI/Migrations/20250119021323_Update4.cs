using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PontosTuristicosAPI.Migrations
{
    /// <inheritdoc />
    public partial class Update4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CriteriosAvaliacoes",
                columns: table => new
                {
                    IdCriterioAvaliacao = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Valor = table.Column<int>(type: "int", nullable: false),
                    InclusaoDataHora = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CriteriosAvaliacoes", x => x.IdCriterioAvaliacao);
                });

            migrationBuilder.CreateTable(
                name: "PontosTuristicos",
                columns: table => new
                {
                    IdPontoTuristico = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Cidade = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Referencia = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Descricao = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Foto = table.Column<string>(type: "VarChar(MAX)", nullable: true),
                    InclusaoDataHora = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PontosTuristicos", x => x.IdPontoTuristico);
                });

            migrationBuilder.CreateTable(
                name: "PontosTuristicosAvaliacoes",
                columns: table => new
                {
                    IdPontoTuristicoAvaliacao = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdCriterioAvaliacao = table.Column<int>(type: "int", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IdPontoTuristico = table.Column<int>(type: "int", nullable: false),
                    IdUsuario = table.Column<int>(type: "int", nullable: false),
                    InclusaoDataHora = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PontosTuristicosAvaliacoes", x => x.IdPontoTuristicoAvaliacao);
                });

            migrationBuilder.CreateTable(
                name: "TiposUsuarios",
                columns: table => new
                {
                    IdTipoUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    InclusaoDataHora = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposUsuarios", x => x.IdTipoUsuario);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdTipoUsuario = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Celular = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Estado = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Cidade = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    InclusaoDataHora = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                });

            migrationBuilder.InsertData(
                table: "CriteriosAvaliacoes",
                columns: new[] { "IdCriterioAvaliacao", "Descricao", "InclusaoDataHora", "Valor" },
                values: new object[,]
                {
                    { 1, "Muito ruim", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8794), 1 },
                    { 2, "Ruim", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8795), 2 },
                    { 3, "Médio", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8796), 3 },
                    { 4, "Bom", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8797), 4 },
                    { 5, "Muito bom", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8798), 5 }
                });

            migrationBuilder.InsertData(
                table: "TiposUsuarios",
                columns: new[] { "IdTipoUsuario", "Descricao", "InclusaoDataHora" },
                values: new object[,]
                {
                    { 1, "Guia", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8683) },
                    { 2, "Visitante", new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(8693) }
                });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "IdUsuario", "CPF", "Celular", "Cidade", "DataNascimento", "Email", "Estado", "IdTipoUsuario", "InclusaoDataHora", "Nome", "Senha" },
                values: new object[] { 1, "51954386842", "14997646017", "Tupã", new DateTime(2002, 4, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "admin@gmail.com", "SP", 1, new DateTime(2025, 1, 18, 23, 13, 23, 22, DateTimeKind.Local).AddTicks(9461), "admin", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CriteriosAvaliacoes");

            migrationBuilder.DropTable(
                name: "PontosTuristicos");

            migrationBuilder.DropTable(
                name: "PontosTuristicosAvaliacoes");

            migrationBuilder.DropTable(
                name: "TiposUsuarios");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
