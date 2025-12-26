using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroProdutos.Migrations
{
    /// <inheritdoc />
    public partial class AddMetaIntegration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessTokenEncrypted",
                table: "MetaIntegrations");

            migrationBuilder.DropColumn(
                name: "AppId",
                table: "MetaIntegrations");

            migrationBuilder.DropColumn(
                name: "Ativo",
                table: "MetaIntegrations");

            migrationBuilder.DropColumn(
                name: "PageId",
                table: "MetaIntegrations");

            migrationBuilder.RenameColumn(
                name: "TokenExpiresAt",
                table: "MetaIntegrations",
                newName: "AccessToken");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "MetaIntegrations",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "MetaIntegrations");

            migrationBuilder.RenameColumn(
                name: "AccessToken",
                table: "MetaIntegrations",
                newName: "TokenExpiresAt");

            migrationBuilder.AddColumn<string>(
                name: "AccessTokenEncrypted",
                table: "MetaIntegrations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AppId",
                table: "MetaIntegrations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Ativo",
                table: "MetaIntegrations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PageId",
                table: "MetaIntegrations",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
