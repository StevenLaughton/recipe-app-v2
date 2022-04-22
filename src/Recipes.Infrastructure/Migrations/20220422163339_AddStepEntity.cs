using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recipes.Infrastructure.Migrations
{
    public partial class AddStepEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Step_Recipes_RecipeId",
                table: "Step");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Step",
                table: "Step");

            migrationBuilder.RenameTable(
                name: "Step",
                newName: "Steps");

            migrationBuilder.RenameIndex(
                name: "IX_Step_RecipeId",
                table: "Steps",
                newName: "IX_Steps_RecipeId");

            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "Steps",
                type: "nvarchar(512)",
                maxLength: 512,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Steps",
                table: "Steps",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Steps_Recipes_RecipeId",
                table: "Steps",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Steps_Recipes_RecipeId",
                table: "Steps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Steps",
                table: "Steps");

            migrationBuilder.RenameTable(
                name: "Steps",
                newName: "Step");

            migrationBuilder.RenameIndex(
                name: "IX_Steps_RecipeId",
                table: "Step",
                newName: "IX_Step_RecipeId");

            migrationBuilder.AlterColumn<string>(
                name: "Text",
                table: "Step",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(512)",
                oldMaxLength: 512);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Step",
                table: "Step",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Step_Recipes_RecipeId",
                table: "Step",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
