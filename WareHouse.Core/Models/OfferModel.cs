using WareHouse.Entities;

namespace WareHouse.Models
{
    public class OfferModel
    {
        public CustomersEntity Customer { get; set; }
        public GoodsEntity Goods { get; set; }
        public int Quantity { get; set; }
        public float PricePerUnit { get; set; }

        public float PricePerComand { get; set; }
        public float Rebate { get; set; }
        
        public int SpecialDeal { get; set; }
        public int SeasonDeal { get; set; }
        public float TotalDiscount { get; set; }
        
        public float QuantityDiscount { get; set; }
    }
}