using Microsoft.EntityFrameworkCore.Migrations;

namespace WareHouse.API.Migrations
{
    public partial class addfieldstocustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SellRate",
                table: "CustomersEntities",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SpecialDeal",
                table: "CustomersEntities",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "GoodsEntities",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsEntities", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoodsEntities");

            migrationBuilder.DropColumn(
                name: "SellRate",
                table: "CustomersEntities");

            migrationBuilder.DropColumn(
                name: "SpecialDeal",
                table: "CustomersEntities");
        }
    }
}
