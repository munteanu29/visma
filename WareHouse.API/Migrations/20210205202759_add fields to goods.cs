using Microsoft.EntityFrameworkCore.Migrations;

namespace WareHouse.API.Migrations
{
    public partial class addfieldstogoods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "GoodsEntities",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "GoodsEntities");
        }
    }
}
