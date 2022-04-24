using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipes.Infrastructure.Migrations
{
    public partial class AddCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Recipes_RecipeId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Recipes_RecipeId",
                table: "Images",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Recipes_RecipeId",
                table: "Images");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Recipes_RecipeId",
                table: "Images",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id");
        }
    }
}
