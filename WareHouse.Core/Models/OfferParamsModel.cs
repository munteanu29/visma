namespace WareHouse.Models
{
    public class OfferParamsModel
    {
        public string CustomerName { get; set; }
        public  string GoodsName { get; set; }
        public  int Quantity { get; set; }
        public  int Rebate { get; set; }
        public int SpecialDeal { get; set; }
        public int SeasonDeal { get; set; }
    }
}