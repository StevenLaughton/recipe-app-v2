using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipes.Infrastructure.Migrations
{
    public partial class AddFare : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Fare",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Fare",
                table: "Recipes",
                column: "Fare");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Recipes_Fare",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Fare",
                table: "Recipes");
        }
    }
}
