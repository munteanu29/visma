using System.Transactions;

namespace WareHouse.Entities
{
    public class CustomersEntity: Entity
    {
        public CustomersEntity(string name, float rebate, float sellRate, string id, bool deleted): base(deleted, id)
        {
            Rebate = rebate;
            Name = name;
            SellRate = sellRate;
        }
        public float Rebate { get; set; }
        public string Name { get; set; }
        public float SellRate { get; set; }
    }
}