using Microsoft.EntityFrameworkCore.Migrations;

namespace WareHouse.API.Migrations
{
    public partial class changetypeofSellRate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SpecialDeal",
                table: "CustomersEntities");

            migrationBuilder.AlterColumn<float>(
                name: "SellRate",
                table: "CustomersEntities",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SellRate",
                table: "CustomersEntities",
                type: "text",
                nullable: true,
                oldClrType: typeof(float));

            migrationBuilder.AddColumn<bool>(
                name: "SpecialDeal",
                table: "CustomersEntities",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
