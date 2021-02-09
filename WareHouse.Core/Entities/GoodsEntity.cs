namespace WareHouse.Entities
{
    public class GoodsEntity:Entity
    {
        public GoodsEntity(string name, float price, int quantity, bool deleted, string id) : base(deleted, id)
        {
            Name = name;
            Price = price;
            Quantity = quantity;
        }
        public string Name { get; set; }
        public float Price { get; set; }
        public   int Quantity { get; set; }
    }
}